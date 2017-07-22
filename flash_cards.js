var ClozeCards = require('./Clozecard.js');
var BasicCards = require('./BasicCard.js');
var basicQuestions = require('./basic.json');
var clozeQuestions = require('./cloze.json');

// Store user input
var processArgv = process.argv.slice(2);
// Variable to store the user's name.
var userName = processArgv[0];
// Variable to store the user's preference to create or answer basic or cloze questions.
var userAction = processArgv[1];

// Variables we will use to loop over the basicQuestions and clozeQuestions objects and store the number of correct answers.
var index = 0;
var correct = 0;


// Function to display the player's score at the end of the game.
var getScore = function(correct) {
  console.log('Game Over!\n');
  console.log('Your score: ' + correct + '/'  + basicQuestions.length + '\n');
};


// Function to ask the player if they'd like to play again or end the game.
var gameStatus = function() {
  // Use Inquirer to ask the user questions.
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


// Function to ask the user what type of questions they'd like to create.
var createQuestions = function(basicQuestions, clozeQuestions) {
  // Use Inquirer to ask the user questions.
  var inquirer = require('inquirer');
  inquirer.prompt([
    {
      type: 'input',
      name: 'questionType',
      message: 'Would you like to create basic or cloze questions?'
    }
  ]).then(function(user) {
    var quesType = user.questionType;
    if(quesType === 'basic') {
      console.log('Great! Let\'s create ' + quesType + ' questions!\n');
      createBasicQues(basicQuestions);
    } else if(quesType === 'cloze') {
      console.log('Great! Let\'s create ' + quesType + ' questions!\n');
      createClozeQues(clozeQuestions);
    } else {
      console.log('Please select a valid question type.');
    }
  });
};


// The variable count will determine how many times the inquirer prompts will appear and how many questions will be created.
var count = 0;
// Function to create basic questions.
var createBasicQues = function(basicQuestions) {
  // Use Inquirer to ask the user questions.
  var inquirer = require('inquirer');
  // Use fs to read and write files.
  var fs = require('fs');
  // Allow user to create two questions per session.
  if(count < 2) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'front',
        message: 'Please enter a question.'
      },
      {
        type: 'input',
        name: 'back',
        message: 'Please enter the answer to the previous question.'
      }
    ]).then(function (card) {

      var newQues = new BasicCards(
        card.front,
        card.back
      );
      // Reading and rewriting the basic.json file to include the newly created questions.
      fs.readFile('basic.json', 'utf-8', function(error, data) {
        var json = JSON.parse(data);
        json.push(newQues);
        fs.writeFileSync('basic.json', JSON.stringify(json));
      });
      count++;
      createBasicQues(basicQuestions);
    });
  } else {
    console.log('You created two basic questions!');
  }
};



// Function to create cloze questions.
var createClozeQues = function(clozeQuestions) {
  // Use Inquirer to ask the user questions.
  var inquirer = require('inquirer');
  // Use fs to read and write files.
  var fs = require('fs');
  // Allow user to create two questions per session.
  if(count < 2) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'fullText',
        message: 'Please enter the full text.'
      },
      {
        type: 'input',
        name: 'cloze',
        message: 'Please enter the cloze deletion.'
      }
    ]).then(function (card) {
      // Create a new instance of ClozeCards
      var newQues = new ClozeCards(
        card.fullText,
        card.cloze
      );
      // Reading and rewriting the cloze.json file to include the newly created questions.
      fs.readFile('cloze.json', 'utf-8', function(error, data) {
        var json = JSON.parse(data);
        json.push(newQues);
        fs.writeFileSync('cloze.json', JSON.stringify(json));
      });
      count++;
      createClozeQues(clozeQuestions);
    });
  } else {
    console.log('You created two cloze questions!');
  }
};
