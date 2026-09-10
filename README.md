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
│       └── ci.yml
├── eslint.config.js
├── jest.config.js
├── package.json
├── .gitignore
├── README.md
└── PRD.md
```
