if (!localStorage.highscore) {
  localStorage.setItem("highscore", 0);
}

let paused = true;
let highscore = localStorage.highscore;

document.querySelector(".highscore").innerText = highscore;
document.querySelector(".start").addEventListener("click", start);

// spel javascript
/* _______________________________________________________________________ */

import Fruit from '/fruit.js';

let score = 0;
let fruit;
let emojis = ['🥝', '🍓', '🍋', '🍐', '🍍', '🍑', '🍇', '🍉', '🍌', '🍏', '🍎', '🍒', '🍊', '🍈', '🥭'];

let player = {
  x: Math.floor(Math.random() * 4),
  y: Math.floor(Math.random() * 4)
}

function start() {
  paused = false;
  spawnFruit();
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".tail").style.setProperty("--x", player.x);
  document.querySelector(".tail").style.setProperty("--y", player.y);

  let timeLeft = 60;
  let timer = setInterval(function() {
    if (paused === false) {
      timeLeft--;
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      if (seconds.toString().length === 1) seconds = "0" + seconds;
      document.querySelector(".time").innerText = minutes + ":" + seconds;
    }
    
    if (timeLeft === 0) {
      end();
      clearInterval(timer);
    }
  }, 1000);
}

function end() {
  paused = true;
  fruit.remove();

  document.querySelector(".time").innerText = "1:00";
  document.querySelector(".score-container").style.display = "block";
  document.querySelector(".currentScore").innerText = score;
  document.querySelector(".overlay").style.display = "flex";
  document.querySelector(".tail").style.setProperty("--x", 0);
  document.querySelector(".tail").style.setProperty("--y", 0);

  if (score > highscore) {
    highscore = score;
    document.querySelector(".highscore").innerText = highscore;
    localStorage.setItem("highscore", score);
  }

  clearScore();
}

function pause() {
  paused = true;
  document.querySelector(".pausedScreen").style.display = "flex";
  document.addEventListener("keyup", function(){
    if (event.keyCode === 27) return;
    paused = false;
    document.querySelector(".pausedScreen").style.display = "none";
  });
}


document.addEventListener("keyup", function(event) {
  if (paused == true) return;

  if (event.keyCode === 38) {
    if (player.y === 0) return;
    document.querySelector(".tail").style.setProperty("--y", player.y - 1)
  }
  if (event.keyCode === 40) {
    if (player.y === 3) return;
    document.querySelector(".tail").style.setProperty("--y", player.y + 1)
  }
  if (event.keyCode === 39) {
    if (player.x === 3) return;
    document.querySelector(".tail").style.setProperty("--x", player.x + 1)
  }
  if (event.keyCode === 37) {
    if (player.x === 0) return;
    document.querySelector(".tail").style.setProperty("--x", player.x - 1)
  }
  if (event.keyCode === 27) pause();

  player.x = parseInt(getComputedStyle(document.querySelector(".tail")).getPropertyValue("--x"));
  player.y = parseInt(getComputedStyle(document.querySelector(".tail")).getPropertyValue("--y"));

  checkPosition();
});


function checkPosition() {
  if (player.x === fruit.x && player.y === fruit.y) {
    addToScore();
    fruit.remove();
    spawnFruit();
  }
}


function spawnFruit() {
  let x;
  let y;

  while (true) {
    x = Math.floor(Math.random() * 4);
    y = Math.floor(Math.random() * 4);
    if (x != player.x && y != player.y) break;
  }
  
  let random = Math.floor(Math.random() * emojis.length)
  fruit = new Fruit(x, y, emojis[random]);
  fruit.print();
}


function addToScore() {
  score++;
  document.querySelector(".score").innerText = score;
}

function clearScore() {
  score = 0;
  document.querySelector(".score").innerText = score;
}