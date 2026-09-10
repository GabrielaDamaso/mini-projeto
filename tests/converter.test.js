const { convertTemperature, formatTemperature } = require('../src/converter');
//console.log(`estou entrando com ${value} de ${from} para ${to}`);
  //estou entrando com 250 de F para C
describe('convertTemperature', () => {
  test('converte Celsius para Fahrenheit', () => {
    expect(convertTemperature(25, 'C', 'F')).toBe(77);
  });

  test('converte Fahrenheit para Celsius', () => {
    expect(convertTemperature(212, 'F', 'C')).toBe(100);
  });

  test('aceita temperaturas negativas', () => {
    expect(convertTemperature(-40, 'C', 'F')).toBe(-40);
  });

  test('mantém o valor quando as unidades são iguais', () => {
    expect(convertTemperature(25, 'C', 'C')).toBe(25);
  });

  test('rejeita valor não numérico', () => {
    expect(() => convertTemperature(NaN, 'C', 'F')).toThrow(
      'A temperatura deve ser um número válido.'
    );
  });

  test('rejeita unidade de origem inválida', () => {
    expect(() => convertTemperature(25, 'K', 'C')).toThrow(
      'Unidade de temperatura inválida.'
    );
  });

  test('rejeita unidade de destino inválida', () => {
    expect(() => convertTemperature(25, 'C', 'K')).toThrow(
      'Unidade de temperatura inválida.'
    );
  });
});

describe('formatTemperature', () => {
  test('limita o resultado a duas casas decimais', () => {
    expect(formatTemperature(10.126)).toBe(10.13);
  });
});
