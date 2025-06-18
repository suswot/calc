let display = document.getElementById('display');
let history = [];

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    let result = eval(display.value);
    if (result !== undefined && display.value.trim() !== '') {
      // Store expression and result
      history.unshift(`${display.value} = ${result}`);
      if (history.length > 3) history.pop();
    }
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function toggleHistory() {
  const box = document.getElementById('historyBox');
  if (box.style.display === 'none') {
    showHistory();
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
}

function showHistory() {
  const box = document.getElementById('historyBox');
  if (history.length === 0) {
    box.innerText = 'Not yet.';
  } else {
    box.innerHTML = history.map(item => `<div>${item}</div>`).join('');
  }
}

document.addEventListener('keydown', function (event) {
  const key = event.key;

  if (/[0-9+\-*/.]/.test(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (/^[cC]$/.test(key)) {
    clearDisplay();
  }
});
