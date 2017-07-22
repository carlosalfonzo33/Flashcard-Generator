var inquirer = require("inquirer");
var fs = require('fs');

var cardData = require('./basic.json');



function BasicCard(front, back) {

	this.front = front;
	this.back = back;
};

inquirer.prompt([{
	type:"input",
	name:"front",
	message:"What is the question you want to ask?"
}, {
	type:"input",
	name:"back",
	message:"What is the answer to the above question?"
}]).then(function(inputs){
	var card = new BasicCard(inputs.front,inputs.back);
	cardData.push(card); 
	
	var newCardData = JSON.stringify(cardData,null,'\t');
	fs.writeFile('./basic.json',newCardData,function(err){
		if(err)throw err;
		console.log("Done");
	})
  })


module.exports = BasicCard;  