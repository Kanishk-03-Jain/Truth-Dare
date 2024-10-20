let players = [];
let playerScores = {};  // Object to track points for each player
let currentPlayer = ''; // Store the currently selected player
let truths = [];
let dares = [];
let timerInterval;
let timeLimit = 30;

const addPlayerBtn = document.querySelector('.add-player-btn');
const playerInput = document.querySelector('.player-input');
const playersList = document.querySelector('.players-list');
const choosePlayerBtn = document.querySelector('.choose-player');
const playerNameDisplay = document.querySelector('.player-name');
const truthBtn = document.querySelector('.truth-btn');
const dareBtn = document.querySelector('.dare-btn');
const completeTaskBtn = document.querySelector('.complete-btn');
const truthDareDisplay = document.querySelector('.truth-dare');
const timeDisplay = document.querySelector('.time');

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        truths = data.truths;
        dares = data.dares;
    })
    .catch(error => console.error('Error loading questions:', error));


function addPlayer() {
    const playerName = playerInput.value.trim();
    if (playerName && !players.includes(playerName)) {
        players.push(playerName);
        playerScores[playerName] = 0;  // Initialize score for new player
        updatePlayersList();
        playerInput.value = '';  // Clear the input field
    }
}

// Add player when button is clicked
addPlayerBtn.addEventListener('click', addPlayer);

// Add player when Enter key is pressed
playerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addPlayer();
    }
});

// Update player list with points
function updatePlayersList() {
    playersList.innerHTML = '';
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player} - Points: ${playerScores[player]}`;  // Show player with points
        playersList.appendChild(li);
    });
}

// Randomly select player
choosePlayerBtn.addEventListener('click', () => {
    if (players.length > 0) {
        const randomIndex = Math.floor(Math.random() * players.length);
        currentPlayer = players[randomIndex];
        playerNameDisplay.textContent = currentPlayer;
        resetTimer();
    } else {
        alert('Please add some players first!');
    }
});

// Random truth selection
truthBtn.addEventListener('click', () => {
    if (truths.length > 0) {
        const randomTruth = truths[Math.floor(Math.random() * truths.length)];
        truthDareDisplay.textContent = `Truth: ${randomTruth}`;
        startTimer();
    } else {
        alert('No truth questions loaded!');
    }
});

// Random dare selection
dareBtn.addEventListener('click', () => {
    if (dares.length > 0) {
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        truthDareDisplay.textContent = `Dare: ${randomDare}`;
        startTimer();
    } else {
        alert('No dare tasks loaded!');
    }
});

// Task completed functionality
completeTaskBtn.addEventListener('click', () => {
    if (currentPlayer) {
        playerScores[currentPlayer] += 1;  // Add 1 point to the current player's score
        updatePlayersList();
        // alert(`${currentPlayer} has completed the task!`);
        resetTimer();
    }
});

// Timer functionality
function startTimer() {
    resetTimer();
    timerInterval = setInterval(() => {
        timeLimit--;
        timeDisplay.textContent = timeLimit;
        if (timeLimit === 0) {
            clearInterval(timerInterval);
            alert("Time's up! You get 0 points.");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLimit = 30;
    timeDisplay.textContent = timeLimit;
}
