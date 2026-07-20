// Grabs the HTML info needed for the high scores page
const scoresList = document.getElementById("scoresList");
const noScores = document.getElementById("noScores");

renderHighScores();

// Reads scores from localStorage (via storage.js) and displays them with a simple bar chart
function renderHighScores() {
  const scores = getHighScores();

  if (scores.length === 0) {
    noScores.hidden = false;
    return;
  }

  scoresList.innerHTML = "";

  const highestScore = scores[0].score;

  scores.forEach((entry, index) => {
    const row = document.createElement("div");
    row.classList.add("score-row");

    const label = document.createElement("p");
    label.classList.add("score-label");
    label.textContent = `${index + 1}. ${entry.name} — ${entry.score}/${entry.total} (${entry.date})`;

    const barTrack = document.createElement("div");
    barTrack.classList.add("bar-track");

    const bar = document.createElement("div");
    bar.classList.add("bar-fill");
    const widthPercent = highestScore > 0 ? (entry.score / highestScore) * 100 : 0;
    bar.style.width = `${widthPercent}%`;

    barTrack.appendChild(bar);
    row.appendChild(label);
    row.appendChild(barTrack);
    scoresList.appendChild(row);
  });
}