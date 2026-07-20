// Shared storage + calculation helpers used on both index.html and highscores.html

const HIGH_SCORE_KEY = "triviaHighScores";

// Reads saved high scores from localStorage
function getHighScores() {
  const stored = localStorage.getItem(HIGH_SCORE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Adds a new score, keeps the list sorted highest-first, and keeps only the top 10
function saveHighScore(entry) {
  const scores = getHighScores();
  scores.push(entry);
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(topScores));
  return topScores;
}

// Function with 2+ parameters that calculates and returns a value 
function calculateGrade(score, total) {
  const percentage = Math.round((score / total) * 100);

  let grade;
  let message;

  if (percentage >= 90) {
    grade = "S";
    message = "Radical! Total legend!";
  } else if (percentage >= 70) {
    grade = "A";
    message = "Great job, dude!";
  } else if (percentage >= 50) {
    grade = "B";
    message = "Not bad, gnarly effort!";
  } else {
    grade = "C";
    message = "Better luck next time!";
  }

  return { percentage, grade, message };
}