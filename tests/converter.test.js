const { convertTemperature, formatTemperature } = require('../src/converter');
//console.log(`estou entrando com ${value} de ${from} para ${to}`);
  //estou entrando com 250 de F para C
describe('convertTemperature', () => {
  test('converte Celsius para Fahrenheit', () => {
    expect(convertTemperature(25, 'C', 'F')).toBe(77);
  });

  test('converte o ponto de congelamento da água', () => {
    expect(convertTemperature(0, 'C', 'F')).toBe(32);
  });

  test('converte Fahrenheit para Celsius', () => {
    expect(convertTemperature(212, 'F', 'C')).toBe(100);
  });

  test('converte o ponto de congelamento da água de Fahrenheit para Celsius', () => {
    expect(convertTemperature(32, 'F', 'C')).toBe(0);
  });

  test('converte valores fracionários sem perder precisão', () => {
    expect(convertTemperature(37.5, 'C', 'F')).toBe(99.5);
  });

  test('aceita temperaturas negativas', () => {
    expect(convertTemperature(-40, 'C', 'F')).toBe(-40);
  });

  test('converte temperaturas negativas de Fahrenheit para Celsius', () => {
    expect(convertTemperature(-4, 'F', 'C')).toBe(-20);
  });

  test('permite voltar ao valor original após duas conversões', () => {
    const fahrenheit = convertTemperature(21.5, 'C', 'F');
    const celsius = convertTemperature(fahrenheit, 'F', 'C');

    expect(celsius).toBeCloseTo(21.5);
  });

  test('mantém o valor quando as unidades são iguais', () => {
    expect(convertTemperature(25, 'C', 'C')).toBe(25);
  });

  test.each([NaN, Infinity, -Infinity, '25', null])(
    'rejeita valor inválido: %p',
    (value) => {
      expect(() => convertTemperature(value, 'C', 'F')).toThrow(
        'A temperatura deve ser um número válido.'
      );
    }
  );

  test('rejeita unidades com diferença de maiúsculas e minúsculas', () => {
    expect(() => convertTemperature(25, 'c', 'F')).toThrow(
      'Unidade de temperatura inválida.'
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

  test('arredonda valores negativos para duas casas decimais', () => {
    expect(formatTemperature(-10.126)).toBe(-10.13);
  });

  test('mantém valores inteiros como números', () => {
    expect(formatTemperature(25)).toBe(25);
  });
});
