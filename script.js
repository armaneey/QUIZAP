let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 10;


let timer;
let seconds = 0;
const quizTimeLimit = 60;

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

window.onload = () => {

    updateLeaderboard(); 
}

function startQuiz() {
    currentQuestionIndex = 1;
    score = 0;
    showSection('question-1');
    startTimer();
}
function startTimer() {
    timer = setInterval(function() {
        seconds++;
        document.getElementById('timer').textContent = "Time: " + formatTime(seconds);

    if (seconds >= quizTimeLimit) {
        clearInterval(timer);
        alert("Time's up!");
        showResult();
    }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}



function showSection(sectionClass) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector('.' + sectionClass).classList.add('active');
}

function checkAnswer(questionClass, isCorrect) {
    if (isCorrect) {
        score++;
    }

    if (currentQuestionIndex < totalQuestions) {
        currentQuestionIndex++;
        showSection('question-' + currentQuestionIndex);
    } else {
        
        showResult();
    }
    
}

function showResult() {
    if (score === totalQuestions) {
        showSection('win-screen');
    } else {
        showSection('lose-screen');
    }
    
}
function showResult() {
    clearInterval(timer);  
     const userName = prompt("Enter your name:");  

    const user = {
        name: userName,
        time: seconds
    };
    leaderboard.push(user);

    updateLeaderboard();

    resetQuiz();
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';  
    leaderboard.sort((a, b) => a.time - b.time);

    leaderboard.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${user.name} - Time: ${formatTime(user.time)}`;
        leaderboardList.appendChild(li);
    });
}

function resetQuiz() {
    seconds = 0;
    document.getElementById('timer').textContent = "Time: 00:00";
}

    if (score === totalQuestions) {
        document.getElementById('score-display').textContent = score;
        showSection('win-screen');
    } else {
        document.getElementById('score-display-lose').textContent = score;
        showSection('lose-screen');
    }
}
const clearLeaderboard = () => {
    leaderboard = [];
    localStorage.removeItem('leaderboard');
    updateLeaderboard();
}

