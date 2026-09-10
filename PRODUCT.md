# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Qualquer pessoa que precise converter temperaturas entre Celsius e Fahrenheit, com foco no uso e na avaliação de uma demonstração acadêmica de desenvolvimento de software.

## Product Purpose

O Conversor de Temperaturas permite informar uma temperatura, escolher as unidades de origem e destino e visualizar o valor convertido. O sucesso significa realizar conversões corretas, tratar entradas inválidas e demonstrar um fluxo funcional com práticas básicas de qualidade e CI.

## Positioning

O projeto demonstra o ciclo completo de uma pequena aplicação web com interface, validação, testes automatizados, cobertura, lint e integração contínua, em vez de oferecer apenas uma fórmula isolada.

## Operating Context

A aplicação é executada localmente abrindo `src/index.html` no navegador. Ela é avaliada como um mini projeto acadêmico, com comandos npm para lint, testes, cobertura e verificação completa, além de uma pipeline de CI para validar as mudanças.

## Capabilities and Constraints

- Aceita valores numéricos, inclusive negativos.
- Converte Celsius para Fahrenheit e Fahrenheit para Celsius.
- Mantém o valor quando as unidades de origem e destino são iguais.
- Exibe o resultado com no máximo duas casas decimais.
- Rejeita valores vazios ou não numéricos e informa erros.
- Permite limpar a entrada, o resultado e as mensagens.
- É exclusivamente front-end, sem backend, banco de dados, autenticação ou APIs externas.
- O MVP não inclui conversão para Kelvin, histórico persistido, usuários ou permissões.
- A tecnologia confirmada é HTML, CSS e JavaScript, com Jest, ESLint e CI.

## Evidence on Hand

- `PRD.md`: requisitos funcionais, regras de negócio, escopo, critérios de aceite e evolução planejada.
- `README.md`: instalação, execução local, comandos de qualidade, pipeline e estrutura.
- `src/index.html`: tela única e controles da conversão.
- `src/converter.js`: regras de conversão e formatação.
- `src/script.js`: validação e interação da interface.
- `tests/converter.test.js`: testes automatizados das conversões e da formatação.
- Não há backend, dados externos, depoimentos, clientes ou outros ativos de prova; trabalhos futuros não devem inventá-los.

## Product Principles

- Correção matemática antes de conveniência visual.
- Feedback claro para entradas inválidas e resultados válidos.
- Escopo pequeno e executável localmente sem serviços externos.
- Qualidade verificável por testes, cobertura, lint e CI.
- Evoluções devem preservar a simplicidade do MVP.
