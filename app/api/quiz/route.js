import connect from '@/lib/db';
import { NextResponse } from 'next/server';
import Quiz from '@/lib/models/quiz';
export const POST = async (req) => {
	try {
		const body = await req.json();

		await connect();
		const newQuiz = new Quiz(body);
		await newQuiz.save();
		return new NextResponse(
			JSON.stringify({ message: 'Quiz is created', quiz: newQuiz }),
			{ status: 201 }
		);
	} catch (error) {
		return new NextResponse('Error in creating quiz' + error, {
			status: 500,
		});
	}
};

export const GET = async () => {
	try {
		console.log('route');
		await connect();

		const quiz = await Quiz.find();
		return new NextResponse(JSON.stringify(quiz), {
			status: 200,
		});
	} catch (error) {
		return new NextResponse('Error in fetching quiz' + error, {
			status: 500,
		});
	}
};
