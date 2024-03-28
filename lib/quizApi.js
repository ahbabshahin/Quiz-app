'use server';
const baseUrl = 'http://localhost:3000/api';

export async function addQuiz(payload) {
	let response = await fetch(`${baseUrl}/quiz`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: { 'Content-type': 'application/json' },
	});

	if (!response.ok) {
		throw new Error('Failed to add quiz');
	}

	const quizData = await response.json();
	console.log(quizData);
	return quizData;
}

export async function getQuiz() {
	const quiz = await fetch(baseUrl + '/quiz', {
		method: 'GET',
	});

	const quizList = quiz.json();
	console.log(quizList);
	return quizList;
}
