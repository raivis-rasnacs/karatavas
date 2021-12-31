// Minamie vārdi
const words = ['car', 'castle', 'umbrella', 'scissors', 'train', 'sun']

//Alfabēts
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

// [Jauns vārds]
newGame = document.createElement("button"); 
newGame.innerHTML = "Jauns vārds";
newGame.setAttribute("id", "newGame");
newGame.setAttribute("onclick", "newWord()");
document.getElementById("alphabet").appendChild(newGame);

// Alfabēta pogas
for (letter of alphabet) {
  button = document.createElement("button");
  button.setAttribute("id", letter);
  button.setAttribute("class", "letterButton");
  button.innerHTML = letter;
  button.setAttribute("onclick", "tryLetter(this.id)")
  document.getElementById("alphabet").appendChild(button);
}

var word;
var guessedLetters;
var lives;
const message = document.getElementById("text");

// Nodzēš esošo vārdu
function removeCurrentWord() {
  const cells = document.querySelectorAll("td");
  if (cells.length > 0) {
    for (cell of cells) {
      cell.remove();
    }
  }
}

// Jauns vārds
function newWord() {
  //Aktivizē burtu pogas
  const buttons = document.getElementsByClassName("letterButton");
  for (button of buttons) {
    button.style.visibility = "visible";
    button.disabled = false;
  }

  removeCurrentWord();
  word = words[Math.floor(Math.random()*words.length)]
  for (letter in word) {
    letterBox = document.createElement("td");
    letterBox.setAttribute("id", letter);
    document.getElementById("word").appendChild(letterBox);
  }
  guessedLetters = 0
  lives = 10
  message.innerHTML = "Atlikušās dzīvības: " + lives;
}

// Burta izvēle
function tryLetter(chosenLetter) {
  document.getElementById(chosenLetter).style.visibility = "hidden";
  var letterFound = false;
  for (letter in word) {
    if (word[letter] == chosenLetter) {
      document.getElementById(letter).innerHTML = chosenLetter;
      guessedLetters += 1;
      letterFound = true;
    }
  }
  if (guessedLetters == word.length) { message.innerHTML = "Tu atminēji!"; disableButtons(); }
  if (letterFound == false) {
  lives -= 1;
  message.innerHTML = "Atlikušās dzīvības: " + lives;
  }
  if (lives == 0) { message.innerHTML = "Tu zaudēji!"; disableButtons(); }
}

//Deaktivizē burtu pogas
function disableButtons() {
  const buttons = document.getElementsByClassName("letterButton");
  for (button of buttons) {
    button.disabled = true;
  }
}