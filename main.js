// variables
const formElm = document.querySelector("form");
const inputElm = document.querySelector("#set-win-score");
const winScoreElm = document.querySelector(".win-score");
const p1BtnElm = document.querySelector(".p1Btn");
const p2BtnElm = document.querySelector(".p2Btn");
const p1ScoreElm = document.querySelector(".p1");
const p2ScoreElm = document.querySelector(".p2");
const resetBtnElm = document.querySelector("#resetBtn");
const diceElm = document.querySelector(".dice");

// Data store
let p1Score = 0;
let p2Score = 0;
let winningScore = 10;
let gameOver = false;

//finding winner
function winningState() {
  if (p1Score >= winningScore) {
    gameOver = true;
    p1BtnElm.classList.add("winnerColor");
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  } else if (p2Score >= winningScore) {
    gameOver = true;
    p2BtnElm.classList.add("winnerColor");
    p1BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.setAttribute("disabled", "disabled");
  }
}

// Displaying winning score
winScoreElm.textContent = winningScore;

//events on p1 click
p1BtnElm.addEventListener("click", () => {
  if (!gameOver) {
    let randomNumber = Math.floor(Math.random() * 7); //(0 to 6)
    p1Score += randomNumber;
    p1ScoreElm.textContent = p1Score;
    diceElm.textContent = randomNumber;
    p1BtnElm.setAttribute("disabled", "disabled");
    p1BtnElm.classList.add("disableColor");
    p2BtnElm.removeAttribute("disabled");
    p2BtnElm.classList.remove("disableColor");
    // Checking winner
    winningState();
  }
});

//events on p2 click
p2BtnElm.addEventListener("click", () => {
  if (!gameOver) {
    let randomNumber = Math.floor(Math.random() * 7); //(0 to 6)
    p2Score += randomNumber;
    p2ScoreElm.textContent = p2Score;
    diceElm.textContent = randomNumber;
    p2BtnElm.setAttribute("disabled", "disabled");
    p2BtnElm.classList.add("disableColor");
    p1BtnElm.removeAttribute("disabled");
    p1BtnElm.classList.remove("disableColor");
    // Checking winner
    winningState();
  }
});

function resetBtn() {
  p1Score = 0;
  p2Score = 0;
  gameOver = false;

  p1ScoreElm.textContent = p1Score;
  p2ScoreElm.textContent = p2Score;
  diceElm.textContent = 0;

  p1BtnElm.classList.remove("winnerColor", "disableColor");
  p2BtnElm.classList.remove("winnerColor", "disableColor");
  p1BtnElm.removeAttribute("disabled");
  p2BtnElm.removeAttribute("disabled");

  winScoreElm.textContent = winningScore;
}

// Reset button event listener
resetBtnElm.addEventListener("click", resetBtn);

// Validate input
function identifyingValidateInput(elmVal) {
  if (elmVal.trim() === "" || isNaN(Number(elmVal)) || Number(elmVal) <= 0) {
    alert("Please input a valid number");
    return false;
  }
  return true;
}

// score submit
formElm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = inputElm.value;
  if (!identifyingValidateInput(inputValue)) return;
  resetBtn();
  winningScore = Number(inputValue);
  winScoreElm.textContent = winningScore;
  inputElm.value = "";
});
