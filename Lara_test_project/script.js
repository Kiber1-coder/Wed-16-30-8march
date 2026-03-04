// Переменные для игры
let currentQuestion = 1;
const correctAnswers = {
    1: 'тюльпан',
    2: 'чай',
    3: 'рисовать'
};

// Функция для начала квеста
function startQuest() {
    document.getElementById('greetingScreen').classList.remove('active');
    document.getElementById('questScreen').classList.add('active');
    currentQuestion = 1;
    showQuestion(1);
    hideMessage('congratsMessage');
    hideMessage('tryAgainMessage');
}

// Функция показа вопроса
function showQuestion(questionNumber) {
    // Скрываем все вопросы
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`question${i}`).classList.remove('active');
    }
    // Показываем нужный вопрос
    document.getElementById(`question${questionNumber}`).classList.add('active');
}

// Функция проверки ответа
function checkAnswer(questionNumber, answer) {
    if (answer === correctAnswers[questionNumber]) {
        // Правильный ответ
        if (questionNumber < 3) {
            // Переход к следующему вопросу
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            // Все вопросы отвечены правильно
            showCongrats();
        }
    } else {
        // Неправильный ответ
        showTryAgain();
    }
}

// Функция показа поздравления
function showCongrats() {
    // Скрываем все вопросы
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`question${i}`).classList.remove('active');
    }
    // Показываем поздравление
    document.getElementById('congratsMessage').classList.remove('hidden');

    // Добавляем конфетти (простая версия)
    createConfetti();
}

// Функция показа сообщения "попробуй снова"
function showTryAgain() {
    const tryAgain = document.getElementById('tryAgainMessage');
    tryAgain.classList.remove('hidden');

    // Скрываем сообщение через 2 секунды
    setTimeout(() => {
        tryAgain.classList.add('hidden');
    }, 2000);
}

// Функция скрытия сообщения
function hideMessage(messageId) {
    document.getElementById(messageId).classList.add('hidden');
}

// Функция перезапуска открытки
function restartCard() {
    document.getElementById('questScreen').classList.remove('active');
    document.getElementById('greetingScreen').classList.add('active');
    currentQuestion = 1;
    hideMessage('congratsMessage');
}

// Простая функция для создания конфетти
function createConfetti() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['🌸', '🌷', '❤️', '🎉', '✨'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10%';
            confetti.style.fontSize = '24px';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'floatHeart 3s linear';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Добавляем анимацию загрузки
window.onload = function() {
    console.log('Открытка с квестом загружена! 🌸');
};