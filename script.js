// Grabs the HTML info needed to control with JavaScript
const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("question");
const answersBox = document.getElementById("answers");
const scoreText = document.getElementById("score");
const winVideo = document.getElementById("winVideo");
const loseVideo = document.getElementById("loseVideo");
const resultScreen = document.getElementById("resultScreen");
const resultTitle = document.getElementById("resultTitle");
const playAgainBtn = document.getElementById("playAgainBtn");
const gameTitle = document.querySelector(".game-title");

// Variables that keep track of the game state
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Starts the game when player pushes start
startBtn.addEventListener("click", startGame);

// Restarts the game when player pushes Play Again on the credits screen
playAgainBtn.addEventListener("click", function () {
  resultScreen.hidden = true;
  winVideo.src = "";
  loseVideo.src = "";
  startGame();
});

// This hides the title/start button on load, since startGame() runs immediately
gameTitle.style.display = "none";
startBtn.style.display = "none";

startGame();

// This starts or restarts the game
async function startGame() {
  startBtn.style.display = "none";

  winVideo.style.display = "none";
  loseVideo.style.display = "none";
  winVideo.src = "";
  loseVideo.src = "";

  score = 0;
  currentQuestionIndex = 0;

  // Shows loading text while the API gets question
  scoreText.textContent = "Score: 0";
  questionText.textContent = "Loading questions...";
  answersBox.innerHTML = "";

  // API cartoon and animation questions
  const apiUrl =
    "https://opentdb.com/api.php?amount=10&category=32&type=multiple";

  try {
    const response = await fetch(apiUrl); // ask for trivia questions
    const data = await response.json();

    // Format the API questions so game can use them
    questions = data.results.map((item) => {
      const allAnswers = [...item.incorrect_answers, item.correct_answer];

      return {
        question: decodeText(item.question),
        correctAnswer: decodeText(item.correct_answer),
        answers: shuffleArray(allAnswers.map((answer) => decodeText(answer)))
      };
    });

    // Shows the first question
    showQuestion();

  } catch (error) {
    questionText.textContent = "Could not load trivia questions."; // shows error if page could not load
    console.log(error);
  }
}

function showQuestion() {
  answersBox.innerHTML = "";

  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  // gets the question from the questions array
  const currentQuestion = questions[currentQuestionIndex];

  // Puts question on the page
  questionText.textContent = currentQuestion.question;

  // create button for possible answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");

    // checks the answer when the player clicks the button
    button.addEventListener("click", function () {
      checkAnswer(answer);
    });

    answersBox.appendChild(button);
  });
}

// checks if the answer is correct
function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  // if the answer is correct add 1 point
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    scoreText.textContent = `Score: ${score}`;
  }

  // Moves to the next question
  currentQuestionIndex++;
  showQuestion();
}

// Runs when the player finishes all questions
function endGame() {
  questionText.textContent = `Game Over! Final Score: ${score} out of ${questions.length}`;
  answersBox.innerHTML = "";

  winVideo.style.display = "none";
  loseVideo.style.display = "none";

  resultScreen.hidden = false;

  if (score >= 7) {
    winVideo.src = winVideo.dataset.src;
    winVideo.style.display = "block";
    resultTitle.textContent = "You Win! Thanks for playing!";
  } else {
    loseVideo.src = loseVideo.dataset.src;
    loseVideo.style.display = "block";
    resultTitle.textContent = "You Lose! Thanks for playing!";
  }
}

// Function mixes up the answer choices so the correct one is not last
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// This fixes special characters that come from the API
function decodeText(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}