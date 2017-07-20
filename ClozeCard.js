var BasicCards = require('./BasicCard.js');

function ClozeCard(fullText, cloze) {
	this.fullText = fullText;
	this.cloze = cloze;
};

ClozeCard.prototype.getFullText = function(fullText) {
	return this.fullText;
}

ClozeCard.prototype.getPartialText = function(fullText, cloze) {
	return this.fullText.replace(this.cloze, '...');
}

ClozeCard.prototype.brokenCloze = function(fullText, cloze) {
	throw new Error('The cloze deletion did not appear.');
}

module.exports = ClozeCard;