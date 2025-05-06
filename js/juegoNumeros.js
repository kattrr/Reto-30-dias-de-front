document.addEventListener('DOMContentLoaded', () => {
  const guessInput = document.getElementById('guessInput');
  const resultText = document.getElementById('result');
  const guessButton = document.getElementById('guessButton');
  const restartButton = document.getElementById('restartButton');

  let secretNumber = generateSecret();
  let attempts = 0;

  function generateSecret() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const checkGuess = () => {
    const inputValue = guessInput.value.trim();

    if (inputValue === '') {
      resultText.textContent = '⚠️ Ingresa un número antes de continuar.';
      return;
    }

    const guess = parseInt(inputValue, 10);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      resultText.textContent = '⚠️ Ingresa un número válido entre 1 y 100.';
      return;
    }

    attempts++;

    if (guess < secretNumber) {
      resultText.textContent = '🔻 Demasiado bajo.';
    } else if (guess > secretNumber) {
      resultText.textContent = '🔺 Demasiado alto.';
    } else {
      resultText.textContent = `🎉 ¡Correcto! Adivinaste el número ${secretNumber} en ${attempts} intentos.`;
      guessInput.disabled = true;
      guessButton.disabled = true;
    }

    guessInput.value = '';
    guessInput.focus();
  };

  const restartGame = () => {
    secretNumber = generateSecret();
    attempts = 0;
    guessInput.disabled = false;
    guessInput.value = '';
    guessButton.disabled = false;
    resultText.textContent = '';
    guessInput.focus();
  };

  guessButton.addEventListener('click', checkGuess);
  restartButton.addEventListener('click', restartGame);
  guessInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkGuess();
  });
});
