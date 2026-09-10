# PRD — Conversor de Temperaturas

## 1. Visão geral

### 1.1 Nome do projeto
**Conversor de Temperaturas**

### 1.2 Objetivo
Desenvolver uma aplicação web simples capaz de realizar a conversão de temperaturas entre Celsius (°C) e Fahrenheit (°F), demonstrando boas práticas básicas de desenvolvimento, incluindo linter, testes automatizados, cobertura de testes e Integração Contínua (CI).

### 1.3 Escopo
O projeto será desenvolvido exclusivamente no front-end, utilizando HTML, CSS e JavaScript. Não haverá backend, banco de dados, autenticação ou APIs externas.

## 2. Público-alvo
Projeto acadêmico para demonstrar desenvolvimento de software com práticas básicas de qualidade e CI. O usuário final é qualquer pessoa que precise converter temperaturas entre Celsius e Fahrenheit.

## 3. Requisitos funcionais

- **RF01 — Informar temperatura:** permitir que o usuário informe um valor numérico.
- **RF02 — Selecionar unidade de origem:** Celsius ou Fahrenheit.
- **RF03 — Selecionar unidade de destino:** Celsius ou Fahrenheit.
- **RF04 — Celsius → Fahrenheit:** usar `F = (C × 9/5) + 32`.
- **RF05 — Fahrenheit → Celsius:** usar `C = (F − 32) × 5/9`.
- **RF06 — Exibir resultado:** apresentar valor convertido e unidade de destino.
- **RF07 — Validar entrada:** rejeitar campo vazio e valores não numéricos.
- **RF08 — Mesma unidade:** manter o valor quando origem e destino forem iguais.
- **RF09 — Limpar conversão:** permitir limpar entrada, resultado e mensagens.

## 4. Requisitos não funcionais

- **RNF01 — Tecnologia:** HTML, CSS e JavaScript.
- **RNF02 — Sem backend:** nenhuma dependência de servidor ou API.
- **RNF03 — Linter:** ESLint configurado para o JavaScript.
- **RNF04 — Testes:** Jest para testes automatizados.
- **RNF05 — Cobertura:** relatório de cobertura com meta mínima global de 90% para statements, branches, functions e lines.
- **RNF06 — CI:** pipeline automática para instalar dependências, executar linter, testes e cobertura.
- **RNF07 — Execução local:** README com instruções de instalação e execução.
- **RNF08 — Interface:** tela simples, responsiva e de fácil utilização.

## 5. Regras de negócio

- **RN01:** Celsius para Fahrenheit: `F = (C × 9/5) + 32`.
- **RN02:** Fahrenheit para Celsius: `C = (F − 32) × 5/9`.
- **RN03:** mesma unidade retorna o valor original.
- **RN04:** resultado exibido com no máximo duas casas decimais.
- **RN05:** valores negativos são aceitos.
- **RN06:** valores vazios ou não numéricos não geram conversão.

## 6. Interface

A aplicação terá uma única tela com:

- Título “Conversor de Temperaturas”;
- Campo de temperatura;
- Unidade de origem;
- Unidade de destino;
- Botão “Converter”;
- Área de resultado;
- Botão “Limpar”;
- Área para mensagens de erro.

### Fluxo

1. Usuário informa a temperatura.
2. Seleciona origem e destino.
3. Clica em “Converter”.
4. Sistema valida os dados.
5. Sistema realiza a conversão ou informa o erro.
6. Resultado é apresentado na tela quando válido.

## 7. Testes

A suíte deverá validar cenários de sucesso e erro, incluindo:

- Celsius → Fahrenheit;
- Fahrenheit → Celsius;
- valores negativos;
- mesma unidade;
- campo/valor inválido;
- unidades inválidas;
- arredondamento para duas casas decimais.

## 8. Cobertura de testes

Meta mínima global:

- Statements: ≥ 90%
- Branches: ≥ 90%
- Functions: ≥ 90%
- Lines: ≥ 90%

## 9. Pipeline de CI

Fluxo esperado:

```text
Push / Pull Request
        ↓
Checkout
        ↓
Node.js
        ↓
Instalar dependências
        ↓
ESLint
        ↓
Testes + cobertura
        ↓
Pipeline aprovada ou reprovada
```

A pipeline deverá falhar caso o linter, os testes ou o limite de cobertura não sejam atendidos.

## 10. Estrutura inicial esperada

```text
conversor-temperaturas/
├── src/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── converter.js
├── tests/
│   └── converter.test.js
├── coverage/
├── .eslintrc.json
├── eslint.config.js
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
└── .github/
    └── workflows/
        └── ci.yml
```

A pasta `coverage/` é gerada automaticamente e não deve ser versionada. O `package-lock.json` será gerado pelo npm durante a instalação e deve ser versionado quando o primeiro `npm install` for executado em um ambiente com acesso ao registry.

## 11. Critérios de aceite

- Conversão Celsius → Fahrenheit correta.
- Conversão Fahrenheit → Celsius correta.
- Conversão entre mesma unidade preserva o valor.
- Entradas inválidas exibem erro e não geram resultado.
- Testes automatizados cobrem cenários de sucesso e erro.
- Linter configurado e executável.
- Cobertura mínima configurada.
- Pipeline executa linter, testes e cobertura.
- README documenta execução e comandos do projeto.

## 12. Fora do escopo

- Backend;
- banco de dados;
- autenticação;
- APIs externas;
- histórico persistido;
- conversão para Kelvin;
- aplicativo mobile;
- sistema de usuários e permissões.

## 13. Definição de pronto

- [ ] Interface implementada.
- [ ] Celsius → Fahrenheit funcionando.
- [ ] Fahrenheit → Celsius funcionando.
- [ ] Mesma unidade funcionando.
- [ ] Validações funcionando.
- [ ] Testes automatizados implementados.
- [ ] Cenários de sucesso e erro cobertos.
- [ ] ESLint configurado.
- [ ] Cobertura configurada.
- [ ] Pipeline CI configurada.
- [ ] README concluído.
- [ ] Projeto versionado no Git.

## 14. Evoluções futuras

Os itens abaixo fazem parte da evolução planejada e **não fazem parte do MVP inicial**.

### 14.1 IA para revisão dos testes

Em uma segunda etapa, será avaliado o uso de Inteligência Artificial para:

- revisar a suíte de testes existente;
- identificar possíveis lacunas de cobertura;
- sugerir novos cenários;
- sugerir casos de borda;
- apontar testes redundantes ou pouco relevantes.

A IA será apoio à qualidade e não substituirá os testes automatizados nem a validação do desenvolvedor. Tecnologia, ferramenta e integração serão definidas posteriormente.

### 14.2 Terraform

Em uma segunda etapa, será introduzida uma estrutura pequena de Terraform para demonstrar infraestrutura como código, contemplando inicialmente:

- estrutura básica do projeto;
- definição de recursos por código;
- uso de arquivos de configuração;
- execução de `terraform init`, `terraform plan` e `terraform apply`;
- avaliação de integração com CI.

O recurso específico a ser provisionado será definido posteriormente. Terraform não será requisito para a execução local do MVP.

### 14.3 Fases

**Fase 1 — MVP:** aplicação, testes, cobertura, linter e CI.

**Fase 2 — Evolução:** IA para revisão/sugestão de testes e introdução de Terraform.
