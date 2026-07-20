# 80's & 90's Trivia

A browser-based trivia game built with vanilla HTML, CSS, and JavaScript, pulling cartoon and animation trivia questions from the Open Trivia Database API. Built as a web development capstone project.

## Features

- Fetches 10 multiple-choice trivia questions from the [OpenTDB API](https://opentdb.com/)
- Validates player name input before allowing the game to start
- Tracks score in real time as the player answers
- Displays a win or lose video ending based on final score
- Saves high scores to `localStorage`, persisting across page reloads
- Dedicated High Scores page with a simple bar-chart visualization
- Calculates a letter grade and message based on final score
- Responsive layout with media queries for mobile and desktop

## Pages

- `index.html` — main trivia game
- `highscores.html` — view saved high scores

## Tech Stack

- HTML5
- CSS3 (custom properties, Flexbox, media queries)
- Vanilla JavaScript (Fetch API, async/await, localStorage)
- [Open Trivia Database API](https://opentdb.com/)

## Project Structure

├── index.html
├── highscores.html
├── style.css
├── script.js
├── highscores.js
├── storage.js
└── README.md

## How to Run

1. Clone the repository
2. Open `index.html` in your browser (no build step or server required)