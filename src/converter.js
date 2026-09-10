/**
 * Converts a temperature between Celsius and Fahrenheit.
 * @param {number} value - Temperature value.
 * @param {'C'|'F'} from - Source unit.
 * @param {'C'|'F'} to - Target unit.
 * @returns {number} Converted temperature.
 */
function convertTemperature(value, from, to) {
  
  if (!Number.isFinite(value)) {
    throw new Error('A temperatura deve ser um número válido.');
  }

  if (!['C', 'F'].includes(from) || !['C', 'F'].includes(to)) {
    throw new Error('Unidade de temperatura inválida.');
  }

  if (from === to) {
    return value;
  }

  if (from === 'C' && to === 'F') {
    return (value * 9 / 5) + 32;
  }

  return (value - 32) * 5 / 9;
}

function formatTemperature(value) {
  return Number(value.toFixed(2));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { convertTemperature, formatTemperature };
}

if (typeof window !== 'undefined') {
  window.temperatureConverter = { convertTemperature, formatTemperature };
}
