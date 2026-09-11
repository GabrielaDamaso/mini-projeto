# Testes complementares

Os testes existentes já cobriam as conversões básicas, temperaturas negativas, unidades iguais, erros principais e o arredondamento de um valor positivo. Os casos adicionados em `tests/converter.test.js` ampliam essa cobertura sem mudar o contrato da aplicação.

## O que foi acrescentado

- **Pontos de referência:** `0 °C = 32 °F` e `32 °F = 0 °C` verificam os limites mais conhecidos da conversão e ajudam a detectar erros no deslocamento de `32`.
- **Valores fracionários:** uma conversão como `37,5 °C = 99,5 °F` confirma que a fórmula preserva casas decimais antes da formatação.
- **Temperaturas negativas nas duas direções:** o caso `-4 °F = -20 °C` complementa o teste existente de `-40 °C = -40 °F` e verifica o caminho inverso da fórmula.
- **Conversão de ida e volta:** converter Celsius para Fahrenheit e depois retornar testa a consistência entre as duas fórmulas. `toBeCloseTo` é usado porque operações com ponto flutuante podem produzir pequenas diferenças binárias.
- **Valores não finitos e tipos incorretos:** `NaN`, infinitos, texto e `null` confirmam que a função aceita somente números finitos, como indicado pela validação com `Number.isFinite`.
- **Unidades fora do contrato:** uma unidade em minúscula confirma que apenas `C` e `F` são aceitas e que a função não faz normalização implícita.
- **Formatação de negativos e inteiros:** verifica que o arredondamento funciona também para valores negativos e que números inteiros continuam sendo retornados como números, não como texto.

## Utilidade

Essas variações cobrem pontos de fronteira, caminhos de execução diferentes e entradas inválidas que podem aparecer na interface. Em conjunto, elas tornam regressões na fórmula, na validação e no arredondamento mais fáceis de identificar, mantendo os testes focados no comportamento público do conversor.

Para executar a suíte:

```bash
npm test
```