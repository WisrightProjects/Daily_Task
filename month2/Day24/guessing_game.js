const secretNumber = 7;

let guess = Number(prompt("Guess a number between 1 and 10"));

while (guess !== secretNumber) {

    console.log("Wrong Guess!");

    guess = Number(prompt("Try Again"));
}

console.log("Congratulations! You guessed correctly.");