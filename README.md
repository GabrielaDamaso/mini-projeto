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

## Agente que altera código

O workflow manual `.github/workflows/agente-codigo.yml` oferece as missões `corrigir_bug` e `aumentar_cobertura`. O agente verifica primeiro a missão, consulta a Groq somente se a verificação falhar e pode propor conteúdo completo para um único arquivo permitido. O script limita a três tentativas, rejeita respostas malformadas e padrões perigosos, verifica a proposta e restaura o alvo se não conseguir aprovação nos testes. Sucesso cria um PR para a branch selecionada; falha após as tentativas cria uma issue. O agente não faz merge.

Antes de executar, habilite **Settings → Actions → General → Workflow permissions → Read and write permissions** e **Allow GitHub Actions to create and approve pull requests**, confirme o secret `GROQCLOUD_API_KEY` e execute em uma branch experimental selecionada no controle de branch do GitHub Actions. Não execute missões experimentais diretamente em `main`. Os experimentos A–E devem usar branches separadas baseadas em `main`, conforme [PRD_DESAFIO_AGENTE_CODIGO.md](./PRD_DESAFIO_AGENTE_CODIGO.md). O agente envia à API o arquivo-alvo, contexto somente leitura e a saída recente da verificação (com limites de tamanho); conteúdo com formato reconhecido de segredo é bloqueado antes do envio.

Para demonstrar `corrigir_bug`, crie `agente-bug` a partir de `main`, altere temporariamente `+ 32` para `+ 30` em `src/converter.js`, confirme que `npm test -- --runInBand` falha e publique essa branch experimental. Depois execute **Actions → Agente de IA que altera código → Run workflow**, selecionando `agente-bug` e `corrigir_bug`. Para `aumentar_cobertura`, crie `agente-testes` a partir de `main`, mantenha `jest.agente.config.js` e confirme que `tests/gerado-ia.test.js` ainda não existe antes do run. Esses passos de preparação não devem ser feitos em `main`.

PRs das missões — preencher somente após criação de PRs reais:

- `corrigir_bug`: **Preencher após execução**.
- `aumentar_cobertura`: **Preencher após execução**.

| Experimento | Ação realizada | Comportamento observado | Link real do run |
|---|---|---|---|
| A — Nada a fazer | Preencher após execução | Preencher após execução | Preencher após execução |
| B — Bug impossível | Preencher após execução | Preencher após execução | Preencher após execução |
| C — Prompt injection no código | Preencher após execução | Preencher após execução | Preencher após execução |
| D — Área proibida | Preencher após execução | Preencher após execução | Preencher após execução |
| E — Arquivo acima de 12.000 bytes | Preencher após execução | Preencher após execução | Preencher após execução |

Para D e E, em uma branch descartável, adicione temporariamente `AGENT_TARGET_OVERRIDE` ao ambiente do step “Executar agente limitado” no workflow: use um caminho em `.github/workflows/` para D e um arquivo `.js` com mais de 12.000 bytes sob `src/` para E. Execute a missão, confirme que o script recusa o alvo antes de qualquer chamada à API e reverta a configuração/arquivo temporário na branch. Não faça merge dessas alterações de experimento.

### Reflexão

- **Faria merge sem ler o diff?** Não. A revisão humana confere intenção, segurança, compatibilidade e qualidade que os testes podem não cobrir.
- **Quem responde por um problema após o merge?** A responsabilidade é das pessoas que mantêm, aprovam e integram o sistema; a IA não substitui a responsabilidade profissional.
- **Por que os testes não podem mudar em `corrigir_bug`?** Eles definem o comportamento esperado e precisam julgar a correção sem o agente alterar o critério para fazê-la passar.
- **O que faltaria para merge autônomo?** Evidências mais amplas, revisão independente, controles de proveniência, segurança e rollback. Mesmo assim, autonomia só seria cogitável em mudanças pequenas, reversíveis e de baixo risco, com governança explícita.
- **Que dados são enviados à API? Usaria código empresarial?** São enviados o alvo, os contextos definidos e a falha recente, limitados pelo script; não enviaria código empresarial sem autorização, avaliação do fornecedor e remoção de dados sensíveis.

### Demonstração breve

1. Em branch experimental, introduza e confirme um bug pequeno sem alterar os testes; mostre que a suíte falha.
2. Dispare o workflow com `corrigir_bug`; apresente Summary, tentativas e PR proposto.
3. Leia o diff e confira os testes antes de qualquer merge manual.
4. Mostre um experimento real de trava A–E e complete a tabela somente com observações e links existentes.

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
│       ├── prompt-injection.yml
│       └── agente-codigo.yml
├── jest.agente.config.js
├── scripts/
│   ├── agente_codigo.sh
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
