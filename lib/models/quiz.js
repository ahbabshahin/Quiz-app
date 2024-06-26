const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	id: Number,
	question: String,
	answers: [String],
	correctAnswer: String,
});

const QuizSchema = new Schema({
	totalQuestions: Number,
	questions: [QuestionSchema],
	createdBy: String,
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
