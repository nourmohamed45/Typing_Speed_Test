//==== Array of Words ====
let words = [
  "apple",
  "architect",
  "banana",
  "ballerina",
  "car",
  "catastrophe",
  "dog",
  "destruction",
  "elephant",
  "encyclopedia",
  "fish",
  "fantastic",
  "gorilla",
  "glacier",
  "hippopotamus",
  "hierarchy",
  "iguana",
  "international",
  "jellyfish",
  "juxtaposition",
  "kangaroo",
  "kaleidoscope",
  "lemon",
  "lion",
  "microscope",
  "meteorite",
  "nirvana",
  "narcissism",
  "octopus",
  "oxygen"
];


let level = document.querySelector(".game .container .message .lvl");
let select = document.querySelector(".game .container .select-level select");
let seconds = document.querySelector(".game .container .message .seconds");
let startBtn = document.querySelector(".game .container .start");
let divWord = document.querySelector(".game .container .the-word");
let again = document.querySelector(".game .container .again");
let input = document.querySelector(".game .container input");
let upComingWords = document.querySelector(".game .container .upcoming-words")
let timeLeft = document.querySelector(".game .container .settings .time span");
let score = document.querySelector(".game .container .settings .score .got");
let total = document.querySelector(".game .container .settings .score .total");
let finish = document.querySelector(".game .container .finish");

let newWords = words;

// Object of levels
let allLevels = {
  Easy: 7,
  Normal: 5,
  Hard: 3
}
//========== Set Default value to level span & seconds span & total span ==========
level.innerHTML = select.value;
seconds.innerHTML = allLevels[select.value];
total.innerHTML = words.length;
timeLeft.innerHTML = allLevels[select.value];

function addLevelSetting() {
  level.innerHTML = select.value;
  seconds.innerHTML = allLevels[select.value];
  timeLeft.innerHTML = allLevels[select.value];
}
// Select action
select.addEventListener("click", () => {
  addLevelSetting();
})

// Start Game
function genWords() {
  startBtn.remove();
  let word = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(word);
  words.splice(wordIndex,1);
  divWord.style.display = "block";
  divWord.innerHTML = word;
  input.focus();
  // Words put into upcoming-words div
  upComingWords.innerHTML = "";
  for(let i=0; i < words.length; i++) {
    let wordDiv = document.createElement("div");
    let text = document.createTextNode(words[i]);
    wordDiv.appendChild(text);
    upComingWords.appendChild(wordDiv);
  }
  startPlay();
}

startBtn.addEventListener("click",() => {
  again.style.display = "block";
  genWords();
})

let start;

function startPlay() {
  timeLeft.innerHTML = allLevels[select.value];
    start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(start);
      if(input.value.toLowerCase() === divWord.innerHTML.toLowerCase()) {
        score.innerHTML++;
        input.value = "";
        if( words.length > 0) {
          genWords();
        } else {
          let good = document.createElement("span");
          let congratz = document.createTextNode("!congratulation 🤩");
          good.className = "good";
          good.appendChild(congratz);
          finish.appendChild(good);
        }
      } else {
        let bad = document.createElement("span");
        let gameOver = document.createTextNode("Game Over 😱");
        bad.className = "bad";
        bad.appendChild(gameOver);
        finish.appendChild(bad);
      }
    }
  },1000)
}

// Play Again

again.onclick = function() {
  clearInterval(start);
  words = [
    "apple",
    "architect",
    "banana",
    "ballerina",
    "car",
    "catastrophe",
    "dog",
    "destruction",
    "elephant",
    "encyclopedia",
    "fish",
    "fantastic",
    "gorilla",
    "glacier",
    "hippopotamus",
    "hierarchy",
    "iguana",
    "international",
    "jellyfish",
    "juxtaposition",
    "kangaroo",
    "kaleidoscope",
    "lemon",
    "lion",
    "microscope",
    "meteorite",
    "nirvana",
    "narcissism",
    "octopus",
    "oxygen",
    "penguin",
    "philosophy",
  ];; // reset the words array
  upComingWords.innerHTML = ""; // clear the "upcoming words" div
  finish.innerHTML = "";
  input.value = "";
  score.innerHTML = "0"; // reset the score
  genWords(); // start the game
}
