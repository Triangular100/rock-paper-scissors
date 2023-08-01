
function game(rounds = 5) {
    let userChoice, computerChoice, roundOutcome;
    let wins = 0;
    let losses = 0;

    console.log(`Welcome to rock, paper, scissors. Play ${rounds} rounds. Get ready!`);

    for (let i = 0; i < rounds; i++) {
        userChoice = prompt("Choose your weapon: ");
        if (userChoice === null) {
            return; // Quit the game
        }

        computerChoice = getComputerChoice();
        console.log(`Your choice: ${userChoice}. Computer's choice: ${computerChoice}`);

        roundOutcome = playRound(userChoice, computerChoice);
        if (roundOutcome === "win") {
            console.log("You won this round!");
            wins++;
        } else if (roundOutcome === "lose") {
            console.log("You lost this round.");
            losses++;
        } else {
            console.log("It's a draw.");
        }
    }

    displayGameResult(wins, losses, rounds);

}

function getComputerChoice() {
    let choice = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[choice];
}

function playRound(playerChoice, computerChoice) {

    // Assumes inputs are one of the valid options
    playerChoice = playerChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    // Scenarios
    // Draw
    //   same choice
    // Win
    //   rock > scissors
    //   paper > rock
    //   scissors > paper
    // Lose
    //   rock < paper
    //   paper < scissors
    //   scissors < rock
    if (playerChoice === computerChoice) {
        return "draw";
    }
    if ((playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")) {
        return "win";
    }
    return "lose";
}

function displayGameResult(wins, losses, rounds) {
    let draws = rounds - wins - losses;
    console.log("Game results:");
    console.log(`Wins: ${wins}, losses: ${losses}, draws: ${draws}.`);
    if (wins === losses) {
        console.log(`It's a draw!`);
    } else if (wins > losses) {
        console.log(`You won!`);
    } else {
        console.log(`You lost. Better luck next time!`);
    }
}

const CHOICES = ["rock", "paper", "scissors"];
game();
