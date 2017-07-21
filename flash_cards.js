var ClozeCards = require('./ClozeCard.js');
var BasicCards = require('./BasicCard.js');
var basicQuestions = require('./basic.json');
var clozeQuestions = require('./cloze.json');

var processArgv = process.argv.slice(2);
var userName = processArgv[0];
var userAction = processArgv[1];

var index = 0;
var correct = 0;

var getScore = function(correct) {
	console.log('Game Over!\n');
	console.log('Your score: ' + correct + '/' + basicQuestions.length + '\n');
};

var gameStatus = function() {
	var inquirer = require('inquirer');
	inquirer.prompt([
	{
		type: 'confirm',
		name: 'playAgain',
		message: 'Would you like to play again?'
	}
		]).then(function(user) {
    if(user.playAgain === true) {
      console.log('Great! Let\'s play again!\n');
        if(userAction === 'basic') {
          basicGame(basicQuestions);
        } else {
          clozeGame(clozeQuestions);
        }
    } else {
      console.log('Thanks for playing! Goodbye!');
    }
  });
};

