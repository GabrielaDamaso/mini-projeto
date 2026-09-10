const temperatureConverter = window.temperatureConverter;

const form = document.querySelector('#temperature-form');
const temperatureInput = document.querySelector('#temperature');
const fromInput = document.querySelector('#from-unit');
const toInput = document.querySelector('#to-unit');
const result = document.querySelector('#result');
const error = document.querySelector('#error');
const clearButton = document.querySelector('#clear-button');
const displayValue = document.querySelector('#display-value');
const displayUnit = document.querySelector('#display-unit');
const displayMessage = document.querySelector('#readout-message');
const signalState = document.querySelector('#signal-state');
const scaleLabel = document.querySelector('#scale-label');
const readout = document.querySelector('.readout');
const steps = [...document.querySelectorAll('.step')];

function updateRail(state) {
  const stateIndex = { input: 0, source: 1, convert: 2, target: 3, error: 0 }[state];

  steps.forEach((step, index) => {
    step.classList.toggle('is-active', index === stateIndex);
    step.classList.toggle('is-done', state !== 'error' && index < stateIndex);
    step.classList.toggle('is-error', state === 'error' && index === 0);
  });
}

function updateScale() {
  scaleLabel.textContent = `${fromInput.value} → ${toInput.value}`;
  displayUnit.textContent = `°${fromInput.value}`;
}

function showError(message) {
  error.textContent = message;
  error.hidden = false;
  result.hidden = true;
  signalState.textContent = 'Atenção';
  displayMessage.textContent = 'Corrija a entrada e tente novamente.';
  updateRail('error');
}

function clearMessages() {
  error.textContent = '';
  error.hidden = true;
  result.textContent = '';
  result.hidden = true;
  signalState.textContent = 'Pronto';
  displayValue.textContent = '--';
  displayUnit.textContent = `°${fromInput.value}`;
  displayMessage.textContent = 'Insira um valor e arme a conversão.';
  readout.classList.remove('is-success');
  updateScale();
  updateRail('input');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMessages();

  const value = Number(temperatureInput.value);
  const from = fromInput.value;
  const to = toInput.value;

  if (temperatureInput.value.trim() === '') {
    showError('Informe uma temperatura.');
    return;
  }

  try {
    updateRail('convert');
    const converted = temperatureConverter.formatTemperature(
      temperatureConverter.convertTemperature(value, from, to)
    );
    result.textContent = `Resultado: ${temperatureInput.value} °${from} = ${converted} °${to}`;
    result.hidden = false;
    displayValue.textContent = converted;
    displayUnit.textContent = `°${to}`;
    displayMessage.textContent = `${temperatureInput.value} °${from} convertido com precisão.`;
    signalState.textContent = 'Concluído';
    scaleLabel.textContent = `${from} → ${to}`;
    readout.classList.remove('is-success');
    requestAnimationFrame(() => readout.classList.add('is-success'));
    updateRail('target');
  } catch (err) {
    showError(err.message);
  }
});

fromInput.addEventListener('change', updateScale);
toInput.addEventListener('change', updateScale);

clearButton.addEventListener('click', () => {
  form.reset();
  clearMessages();
  temperatureInput.focus();
});

updateScale();
