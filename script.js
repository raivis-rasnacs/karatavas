// Minamie vārdi
const words = ['car', 'castle', 'umbrella', 'scissors', 'train', 'sun']

//Alfabēts
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

// [Jauns vārds]
newGame = document.createElement("button"); 
newGame.innerHTML = "Jauns vārds";
newGame.setAttribute("id", "newGame");
newGame.setAttribute("onclick", "newWord()");
document.body.appendChild(newGame);

// Alfabēta pogas
for (letter of alphabet) {
  button = document.createElement("button");
  button.setAttribute("id", letter);
  button.setAttribute("class", "letterButton");
  button.innerHTML = letter;
  button.setAttribute("onclick", "tryLetter(this.id)")
  document.body.appendChild(button);
}

var word;
var guessedLetters;
var lives;
var table = document.createElement("table");
var row = document.createElement("tr");
var message = document.createElement("h3");

// Nodzēš esošo vārdu
function removeCurrentWord() {
  var cells = document.querySelectorAll("td");
  if (cells.length > 0) {
    for (cell of cells) {
      cell.remove();
    }
  }
}

// Jauns vārds
function newWord() {
  //Aktivizē burtu pogas
  var buttons = document.getElementsByClassName("letterButton");
  for (button of buttons) {
    button.style.visibility = "visible";
    button.disabled = false;
  }

  removeCurrentWord();
  word = words[Math.floor(Math.random()*words.length)]
  for (letter in word) {
    letterBox = document.createElement("td");
    letterBox.setAttribute("id", letter);
    row.appendChild(letterBox);
  }
  table.appendChild(row);
  document.body.appendChild(table);
  guessedLetters = 0
  lives = 10
  message.innerHTML = "Atlikušās dzīvības: " + lives;
  document.body.appendChild(message);
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
  var buttons = document.getElementsByClassName("letterButton");
  for (button of buttons) {
    button.disabled = true;
  }
}