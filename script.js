function playOption(event) {
    if (gameOver) {
        return;
    }

    let playerChoice = event.target.id;
    let computerChoice = getComputerChoice();
    let outcome = playRound(playerChoice, computerChoice);

    draw(event.target, computerOptions[computerChoice], outcome);

    if (determineGameOver()) {
        setTimeout(drawResults, 1500, outcome);
        return;
    }

}

function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomChoice];
}

function playRound(playerChoice, computerChoice) {

    // Assumes inputs are valid
    playerChoice = playerChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (playerChoice === computerChoice) {
        return "draw";
    }
    if ((playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")) {
        wins++;
        return "win";
    }
    // Otherwise lose
    //   rock < paper
    //   paper < scissors
    //   scissors < rock
    losses++;
    return "lose";
}

function determineGameOver() {
    if (wins >= 5 || losses >= 5) {
        gameOver = true;
        return true;
    }
    return false;
}

function drawResults(playerOutcome) {
    removeLastChoices();
    playerOptions.forEach(option => displayChoice(option, playerOutcome));
    let computerOutcome = opposite(playerOutcome);
    Object.values(computerOptions).forEach(option => displayChoice(option, computerOutcome));
    displayScore();
}

function draw(playerChoice, computerChoice, playerOutcome) {
    removeLastChoices();
    displayChoice(playerChoice, playerOutcome);
    let computerOutcome = opposite(playerOutcome);
    displayChoice(computerChoice, computerOutcome);
    displayScore();
}

function displayChoice(choice, outcome) {
    choice.classList.add(outcome);
    choice.classList.add("select");
}

function opposite(outcome) {
    if (outcome === "win") {
        return "lose";
    } else if (outcome === "lose") {
        return "win";
    }
    return "draw";
}

function displayScore() {
    computerScore.textContent = losses;
    playerScore.textContent = wins;
}

function restartGame(e) {
    e.target.classList.add("select");
    displayReset();
    removeLastChoices();
    gameOver = false;
    wins = 0;
    losses = 0;
    displayScore();
}

function displayReset() {
    options.forEach(option => option.classList.add("select"));
}

function removeLastChoices() {
    options.forEach(option => {
        option.classList.remove("win");
        option.classList.remove("lose");
        option.classList.remove("draw");
    });
}

function removeTransition(e) {
    e.target.classList.remove("select");
}

const CHOICES = ["rock", "paper", "scissors"];
let gameOver = false;
let wins = 0;
let losses = 0;

const options = document.querySelectorAll(".option"); // Player and Computer Options
const restartOption = document.querySelector(".restart");
const playerOptions = document.querySelectorAll(".player.option");
const computerOptions = {
    "rock": document.querySelector("#computer-rock"),
    "paper": document.querySelector("#computer-paper"),
    "scissors": document.querySelector("#computer-scissors")
};

const computerScore = document.querySelector("#computer-score");
const playerScore = document.querySelector("#player-score");

restartOption.addEventListener("click", restartGame);
playerOptions.forEach(option => option.addEventListener("click", playOption));
options.forEach(option => option.addEventListener("transitionend", removeTransition));