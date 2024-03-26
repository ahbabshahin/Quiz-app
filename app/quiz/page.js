'use client';
import React, { useState } from 'react';
import { quiz } from '../data';

export default function Quiz() {
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [checked, setChecked] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	});

	const { questions } = quiz;
	const length = questions.length;
	const { question, answers, correctAnswer } = questions[activeQuestion];

	const onAnswerSelected = (answer) => {
		setChecked(true);
		setSelectedAnswer(answer);
	};

	const nextQuestion = () => {
		const isCorrect = selectedAnswer === correctAnswer;
		setResult((prev) => ({
			...prev,
			score: isCorrect ? prev.score + 1 : prev.score,
			correctAnswers: isCorrect
				? prev.correctAnswers + 1
				: prev.correctAnswers,
			wrongAnswers: !isCorrect
				? prev.wrongAnswers + 1
				: prev.wrongAnswers,
		}));

		if (activeQuestion < length - 1) {
			setActiveQuestion((prev) => prev + 1);
		} else {
			setShowResult(true);
		}

		setChecked(false);
		setSelectedAnswer('');
	};

	return (
		<div className='container'>
			<h1>Quiz Page</h1>

			{!showResult ? (
				<div className='quiz-container'>
					<div>
						<h2>
							Question: {activeQuestion + 1} / {length}
						</h2>
						<h3>{question}</h3>
						<ul>
							{answers.map((answer, index) => (
								<li
									key={index}
									onClick={() => onAnswerSelected(answer)}
									className={
										selectedAnswer === answer
											? 'li-selected'
											: 'li-hover'
									}
								>
									{answer}
								</li>
							))}
						</ul>
						<button
							className='btn'
							onClick={nextQuestion}
							disabled={!checked}
						>
							{activeQuestion === length - 1 ? 'Finish' : 'Next'}
						</button>
					</div>
				</div>
			) : (
				<div className='quiz-container'>
					<h3>Results</h3>
					<p>Correct Answers: {result.correctAnswers}</p>
					<p>Wrong Answers: {result.wrongAnswers}</p>
					<p>
						Overall: {((result.score / length) * 100).toFixed(2)}%
					</p>
					<button onClick={() => window.location.reload()}>
						Restart
					</button>
				</div>
			)}
		</div>
	);
}
