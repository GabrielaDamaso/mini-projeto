# Conversor de Temperaturas

Mini projeto em HTML, CSS e JavaScript para conversão entre Celsius e Fahrenheit.

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Executar a aplicação

Como o projeto é estático, abra `src/index.html` no navegador.

## Linter

```bash
npm run lint
```

## Testes

```bash
npm test
```

## Testes com cobertura

```bash
npm run test:coverage
```

A cobertura é validada com mínimo global de 90% para statements, branches, functions e lines.

## Verificação completa

```bash
npm run check
```

## Pipeline CI

A pipeline em `.github/workflows/ci.yml` executa automaticamente:

1. Instalação das dependências;
2. Linter;
3. Testes automatizados;
4. Cobertura de testes.

## Laboratório Aula 4

O laboratório mantém o conversor estático e simula dois servidores locais no runner, servindo `src/` em `http://127.0.0.1:8001/` (estável) e `http://127.0.0.1:8002/` (nova). Não há API de aplicação nem rota de health fictícia.

- `.github/workflows/deploy.yml`: demonstra Blue/Green; execute `normal` e `com_falha`.
- `.github/workflows/canary.yml`: demonstra tráfego progressivo de 10% → 50% → 100%; execute `normal`, `com_falha` e `lentidao`.
- `.github/workflows/pipeline-completo.yml`: executa qualidade, SAST, revisão por IA, aguarda aprovação humana e chama o Canary no cenário `normal`.
- `.github/workflows/prompt-injection.yml`: executa manualmente as três comparações e publica as respostas realmente observadas como artefato.
- Inicie cada execução manual em **GitHub → Actions → workflow → Run workflow**. Examine o Summary para métricas, decisão, justificativa, regra responsável e eventual bloqueio/rollback; os JSONs ficam nos artefatos do run.
- Para usar Groq, cadastre `GROQCLOUD_API_KEY` em **Settings → Secrets and variables → Actions → New repository secret**. Nunca inclua a chave em arquivos, comandos salvos ou logs; sem chave ou em caso de erro a decisão usa a opção segura.
- Os scripts usam por padrão o modelo Groq `openai/gpt-oss-120b`; pode-se escolher outro modelo ativo definindo `GROQ_MODEL` no ambiente do workflow. Verifique o catálogo e as depreciações da Groq antes de trocar o modelo.
- Para exigir revisão humana, configure **Settings → Environments → New environment → `producao` → Required reviewers**. A aprovação precisa ser configurada manualmente no GitHub.
- Blue/Green e Canary precisam de pelo menos dois commits na branch, pois a versão estável usa `HEAD~1`. `com_falha` e `lentidao` são simulações isoladas dos workflows; a latência é aplicada somente pelo servidor de laboratório.
- Para iniciar o servidor local: `python3 scripts/servidor_estatico.py --port 8001 --directory src`; encerre com `Ctrl+C`. Os comandos locais de qualidade continuam sendo `npm run lint`, `npm test`, `npm run test:coverage` e `npm run check`.
- O laboratório simula promoção e rollback no runner, não publica um site nem representa infraestrutura, usuários ou todas as condições reais de produção.

### Limitações e ética

- A integração pode enviar à Groq métricas de deploy ou trechos de código para revisão, limitados a 6000 caracteres pelo script de decisão.
- Esses dados podem incluir informação sensível ou conteúdo de terceiros; revise e reduza o material e nunca envie dados pessoais, tokens ou segredos.
- Resposta inválida, indisponibilidade, timeout ou ausência da chave aplicam a opção segura configurada para a tarefa.
- A IA não decide sozinha: limites fixos bloqueiam riscos e o deploy de produção depende de aprovação humana no Environment do GitHub.
- Teste de prompt injection: resultados observados serão preenchidos após a execução; nenhum resultado é declarado antecipadamente.
- A comparação de prompt injection demonstra redução de risco, não garantia de que um modelo nunca seguirá instruções maliciosas.
- A medição do site estático é uma simulação local do workflow e não representa infraestrutura ou tráfego real de produção.

## Estrutura

```text
conversor-temperaturas/
├── src/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── converter.js
├── tests/
│   └── converter.test.js
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       ├── canary.yml
│       ├── pipeline-completo.yml
│       └── prompt-injection.yml
├── scripts/
│   ├── ia_decisao.sh
│   ├── medir.sh
│   ├── servidor_estatico.py
│   └── teste_prompt_injection.sh
├── eslint.config.js
├── jest.config.js
├── package.json
├── .gitignore
├── README.md
├── PRD.md
└── docs/
    ├── aula4-prompt-injection.md
    └── aula4-apresentacao.md
```
