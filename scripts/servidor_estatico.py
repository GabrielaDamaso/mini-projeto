#!/usr/bin/env python3
"""Static HTTP server for isolated Blue/Green and Canary lab simulations."""

import argparse
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class LabHandler(SimpleHTTPRequestHandler):
    request_number = 0
    request_lock = threading.Lock()
    progressive_delay = False

    def do_GET(self):
        if self.progressive_delay:
            with self.request_lock:
                type(self).request_number += 1
                request_number = type(self).request_number
            time.sleep(min(request_number * 0.015, 0.95))
        super().do_GET()

    def log_message(self, format_string, *args):
        print(f"{self.client_address[0]} - {format_string % args}", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", required=True, type=int)
    parser.add_argument("--directory", required=True, type=Path)
    parser.add_argument(
        "--progressive-delay",
        action="store_true",
        help="enable controlled progressive latency for the lab's slow scenario",
    )
    arguments = parser.parse_args()
    directory = arguments.directory.resolve()
    if not directory.is_dir():
        parser.error(f"static directory does not exist: {directory}")

    handler = type(
        "ConfiguredLabHandler",
        (LabHandler,),
        {
            "directory": str(directory),
            "progressive_delay": arguments.progressive_delay,
        },
    )
    server = ThreadingHTTPServer(("127.0.0.1", arguments.port), handler)
    server.daemon_threads = True
    print(
        f"Serving {directory} on http://127.0.0.1:{arguments.port}/ "
        f"(progressive delay: {arguments.progressive_delay})",
        flush=True,
    )
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
