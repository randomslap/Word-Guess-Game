
var game = {
  words: {
    javascript: "javascript",
    class: "class",
    array: "array",
    jumbotron: "jumbotron",
    bootstrap: "bootstrap",
    jquery: "jquery",
    style: "style",
    iteration: "iteration",
    index: "index",
    code: "code",
    function: "function",
    react: "react",
    python: "python",
  },

  word: null,
  matchChar: [],
  guessedChar: [],
  wordChar: [],
  wins: 0,
  remainingGuess: 0,
  totalGuess: 0,
  guessChar: null,

  startGame: function() {
    var keys = Object.keys(this.words);
    this.word = keys[Math.floor(Math.random() * keys.length)];
    this.wordChar = this.word.split("");
    this.displayWord();
    this.processUpdateRemainingGuesses();
  },

  updateGame: function (char) {
    if (this.remainingGuess === 0) {
      this.restartGame();
    } else {
      this.updateGuess(char);
      this.updateMatchChar(char);
      this.displayWord();
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  updateGuess: function(char) {
    if (
      this.guessedChar.indexOf(char) === -1 &&
      this.wordChar.indexOf(char) === -1
    ) {
      this.guessedChar.push(char);
      this.remainingGuess--;
      document.querySelector("#displayLives").innerHTML = this.remainingGuess;
      document.querySelector("#myChar").innerHTML = this.guessedChar.join(", ");
    }
  },

  processUpdateRemainingGuesses: function() {
    this.totalGuess = 6;
    this.remainingGuess = this.totalGuess;
    document.querySelector("#displayLives").innerHTML = this.remainingGuess;
  },

  updateMatchChar: function(char) {
    for (var i = 0; i < this.wordChar.length; i++) {
      if (char === this.wordChar[i] && this.matchChar.indexOf(char) === -1) {
        this.matchChar.push(char);
      }
    }
  },

  displayWord: function() {
    var wordDisplay = "";
    for (var i = 0; i < this.wordChar.length; i++) {
      if (this.matchChar.indexOf(this.wordChar[i]) !== -1) {
        wordDisplay += this.wordChar[i];
      } else {
        wordDisplay += "&nbsp;_&nbsp;";
      }
    }
    document.querySelector("#currentWord").innerHTML = wordDisplay;
  },

  updateWins: function() {
    var wordCharClone = this.wordChar.slice();
    var win;
    this.matchChar.sort().join('') == wordCharClone.sort().join('');
    if (this.matchChar.length === 0) {
      win = false;
    } else {
      win = true;
    }
    for (var i = 0; i < this.wordChar.length; i++) {
      if (this.matchChar.indexOf(this.wordChar[i]) === -1) {
        win = false;
      }
    }
    if (win) {
      var winningWord1 = $("#guessWords");
      var winningWord2 = $("<div>" + this.words[this.word] + "</div>");
      this.wins = this.wins + 1;
      document.querySelector("#wins").innerHTML = this.wins;
      winningWord1.append(winningWord2);
      return true;
    }
    return false;
  },

  restartGame: function() {
    document.querySelector("#myChar").innerHTML = "";
    this.word = [];
    this.wordChar = [];
    this.matchChar = [];
    this.guessedChar = [];
    this.remainingGuess = 0;
    this.totalGuess = 0;
    this.guessChar = null;
    this.startGame();
    this.displayWord();
  }
};

$(document).keyup(function(event) {
  game.guessChar = String.fromCharCode(event.which).toLowerCase();
  game.updateGame(game.guessChar);
  console.log(game.guessChar);
});

game.startGame();
