#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Uso: bash scripts/medir.sh URL_ESTAVEL URL_NOVA PCT_NOVA N_REQUISICOES ARQUIVO_SAIDA\n' >&2
  exit 2
}

[[ $# -eq 5 ]] || usage
url_stable="$1"
url_new="$2"
pct_new="$3"
request_count="$4"
output_file="$5"

[[ "$url_stable" == http://* || "$url_stable" == https://* ]] || usage
[[ "$url_new" == http://* || "$url_new" == https://* ]] || usage
[[ "$pct_new" =~ ^[0-9]{1,3}$ ]] || usage
[[ "$request_count" =~ ^[1-9][0-9]{0,3}$ ]] || usage
(( pct_new >= 0 && pct_new <= 100 )) || usage
(( request_count <= 5000 )) || usage

export URL_ESTAVEL="$url_stable"
export URL_NOVA="$url_new"
export PCT_NOVA="$pct_new"
export N_REQUISICOES="$request_count"
export ARQUIVO_SAIDA="$output_file"

python3 - <<'PY'
import concurrent.futures
import json
import math
import os
import subprocess
import time
from urllib.parse import urlsplit

stable_url = os.environ["URL_ESTAVEL"]
new_url = os.environ["URL_NOVA"]
percentage = int(os.environ["PCT_NOVA"])
request_count = int(os.environ["N_REQUISICOES"])
output_path = os.environ["ARQUIVO_SAIDA"]

for url in (stable_url, new_url):
    parsed = urlsplit(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise SystemExit("As URLs devem ser absolutas e usar HTTP ou HTTPS.")

new_count = (request_count * percentage + 50) // 100
stable_count = request_count - new_count
schedule = [("nova", new_url)] * new_count + [("estavel", stable_url)] * stable_count


def measure(item):
    version, url = item
    started = time.monotonic()
    try:
        result = subprocess.run(
            [
                "curl",
                "--silent",
                "--show-error",
                "--output",
                os.devnull,
                "--write-out",
                "%{http_code} %{time_total}",
                "--max-time",
                "10",
                url,
            ],
            check=False,
            capture_output=True,
            text=True,
            timeout=12,
        )
        elapsed_ms = (time.monotonic() - started) * 1000
        fields = result.stdout.strip().split()
        status = int(fields[0]) if fields else 0
        latency_ms = float(fields[1]) * 1000 if len(fields) > 1 else elapsed_ms
        failed = result.returncode != 0 or status == 0 or status >= 500
    except (OSError, subprocess.TimeoutExpired):
        latency_ms = (time.monotonic() - started) * 1000
        status = 0
        failed = True
    return version, failed, latency_ms


observations = {"nova": [], "estavel": []}
with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
    for version, failed, latency_ms in executor.map(measure, schedule):
        observations[version].append((failed, latency_ms))


def summarize(rows):
    latencies = sorted(latency for _, latency in rows)
    error_count = sum(1 for failed, _ in rows if failed)
    count = len(rows)
    p99 = latencies[max(0, math.ceil(0.99 * count) - 1)] if count else 0
    return {
        "requisicoes": count,
        "erros": error_count,
        "taxa_erro_pct": round(error_count * 100 / count, 2) if count else 0,
        "latencia_p99_ms": round(p99, 2),
    }


result = {
    "pct_nova": percentage,
    "nova": summarize(observations["nova"]),
    "estavel": summarize(observations["estavel"]),
}
os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as output:
    json.dump(result, output, ensure_ascii=False, indent=2)
    output.write("\n")
print(json.dumps(result, ensure_ascii=False))
PY
