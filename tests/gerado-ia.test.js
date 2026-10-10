/* global Event, jest */
const fs = require('fs');
const path = require('path');

describe('src/script.js integration tests', () => {
  const html = `
    <form id="temperature-form">
      <input id="temperature" type="number" />
      <select id="from-unit">
        <option value="C">Celsius</option>
        <option value="F">Fahrenheit</option>
      </select>
      <select id="to-unit">
        <option value="F">Fahrenheit</option>
        <option value="C">Celsius</option>
      </select>
      <button type="submit">Convert</button>
      <button type="button" id="clear-button">Clear</button>
    </form>
    <p id="result" hidden></p>
    <p id="error" hidden></p>
    <p id="signal-state"></p>
    <output id="display-value" class="display-value">--</output>
    <span id="display-unit"></span>
    <p id="readout-message"></p>
    <div class="readout"></div>
    <span id="scale-label"></span>
    <ul class="step-rail">
      <li class="step is-active" data-step="input"></li>
      <li class="step" data-step="source"></li>
      <li class="step" data-step="convert"></li>
      <li class="step" data-step="target"></li>
    </ul>
  `;

  beforeEach(() => {
    // reset DOM
    document.body.innerHTML = html;

    // mock temperatureConverter
    window.temperatureConverter = {
      convertTemperature: jest.fn((value, from, to) => {
        if (from === 'C' && to === 'F') return value * 9 / 5 + 32;
        if (from === 'F' && to === 'C') return (value - 32) * 5 / 9;
        return value;
      }),
      formatTemperature: jest.fn((value) => Number(value.toFixed(2))),
    };

    // mock requestAnimationFrame to run immediately
    global.requestAnimationFrame = (cb) => cb();

    // load script (it attaches listeners)
    jest.resetModules();
    require('../src/script.js');
  });

  test('conversão bem‑sucedida atualiza UI corretamente', () => {
    const tempInput = document.getElementById('temperature');
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    const form = document.getElementById('temperature-form');

    tempInput.value = '25';
    fromSelect.value = 'C';
    toSelect.value = 'F';

    form.dispatchEvent(new Event('submit'));

    const result = document.getElementById('result');
    const displayValue = document.getElementById('display-value');
    const displayUnit = document.getElementById('display-unit');
    const signalState = document.getElementById('signal-state');
    const readout = document.querySelector('.readout');

    expect(window.temperatureConverter.convertTemperature).toHaveBeenCalledWith(25, 'C', 'F');
    expect(window.temperatureConverter.formatTemperature).toHaveBeenCalled();

    expect(result.hidden).toBe(false);
    expect(result.textContent).toContain('Resultado: 25 °C = 77 °F');

    expect(displayValue.textContent).toBe('77');
    expect(displayUnit.textContent).toBe('°F');

    expect(signalState.textContent).toBe('Concluído');
    expect(readout.classList.contains('is-success')).toBe(true);
  });

  test('submissão vazia mostra erro de entrada', () => {
    const form = document.getElementById('temperature-form');
    form.dispatchEvent(new Event('submit'));

    const error = document.getElementById('error');
    const result = document.getElementById('result');
    const signalState = document.getElementById('signal-state');
    const readoutMessage = document.getElementById('readout-message');
    const firstStep = document.querySelector('.step[data-step="input"]');

    expect(error.hidden).toBe(false);
    expect(error.textContent).toBe('Informe uma temperatura.');
    expect(result.hidden).toBe(true);
    expect(signalState.textContent).toBe('Atenção');
    expect(readoutMessage.textContent).toBe('Corrija a entrada e tente novamente.');
    expect(firstStep.classList.contains('is-error')).toBe(true);
  });

  test('erro lançado por temperatureConverter é exibido', () => {
    // force converter to throw
    window.temperatureConverter.convertTemperature.mockImplementation(() => {
      throw new Error('Falha na conversão');
    });

    const tempInput = document.getElementById('temperature');
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    const form = document.getElementById('temperature-form');

    tempInput.value = '100';
    fromSelect.value = 'C';
    toSelect.value = 'F';

    form.dispatchEvent(new Event('submit'));

    const error = document.getElementById('error');
    const signalState = document.getElementById('signal-state');

    expect(error.hidden).toBe(false);
    expect(error.textContent).toBe('Falha na conversão');
    expect(signalState.textContent).toBe('Atenção');
  });

  test('botão limpar reseta formulário e mensagens', () => {
    const tempInput = document.getElementById('temperature');
    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    const clearBtn = document.getElementById('clear-button');

    // pre‑populate fields and simulate a previous conversion
    tempInput.value = '30';
    fromSelect.value = 'F';
    toSelect.value = 'C';
    document.getElementById('result').hidden = false;
    document.getElementById('result').textContent = 'alguma coisa';
    document.getElementById('signal-state').textContent = 'Concluído';

    clearBtn.click();

    expect(document.getElementById('temperature').value).toBe('');
    expect(document.getElementById('result').hidden).toBe(true);
    expect(document.getElementById('error').hidden).toBe(true);
    expect(document.getElementById('signal-state').textContent).toBe('Pronto');
    expect(document.getElementById('display-value').textContent).toBe('--');
  });
});