function checkAnswer(answer) {
  const hintElement = document.getElementById("hint");

  if (answer === "attention") {
    // Правильный ответ - внимание
    document.getElementById("questionBlock").style.display = "none";
    document.getElementById("congratsBlock").style.display = "block";
    hintElement.textContent = "";

    // Добавляем звуковой эффект (если нужно)
    playCongratsSound();
  } else {
    // Неправильный ответ
    hintElement.textContent =
      "🌺 Попробуй еще! Самый дорогой подарок - это... 🌺";
    hintElement.style.animation = "pulse 0.5s";
    setTimeout(() => {
      hintElement.style.animation = "";
    }, 500);

    // Встряхиваем неправильную кнопку
    event.target.style.animation = "shake 0.3s";
    setTimeout(() => {
      event.target.style.animation = "";
    }, 300);
  }
}

function resetGame() {
  document.getElementById("questionBlock").style.display = "block";
  document.getElementById("congratsBlock").style.display = "none";
  document.getElementById("hint").textContent = "";
}

// Добавляем анимацию встряхивания
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

function playCongratsSound() {
  // Создаем простой звуковой эффект с помощью Web Audio API
  try {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // До
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // Ми
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // Соль

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 1,
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  } catch (e) {
    // Если звук не поддерживается, просто игнорируем
    console.log("Звук не поддерживается");
  }
}

// Добавляем эффект появления при загрузке
window.onload = function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
};
