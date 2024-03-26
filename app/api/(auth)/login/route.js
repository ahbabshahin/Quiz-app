import connect from '@/lib/db';
import User from '@/lib/models/users';
const jwt = require('jsonwebtoken');
import { NextResponse } from 'next/server';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	console.log(body);
	const { username, password } = body;

	try {
		const user = await User.findOne({ username });
		console.log(user);
		if (!user) {
			return new NextResponse(
				JSON.stringify({
					message: 'User not found',
				})
			);
		}

		const isPasswordCorrect = await user.comparePassword(password);

		if (!isPasswordCorrect) {
			return new NextResponse(
				JSON.stringify({
					message: 'Invalid Password',
				})
			);
		}

		// const tokenUser = createTokenUser(user);
		// console.log(tokenUser);
		// attachCookiesToResponse({ res, user: tokenUser });

		const token = jwt.sign(body, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_LIFETIME,
		});
		console.log(token);
		const isTokenValid = ({ token }) =>
			jwt.verify(token, process.env.JWT_SECRET);
		if (!isTokenValid) {
			console.error('Error in processing login:', error);
			return new NextResponse(
				JSON.stringify({
					message: 'Error in processing login',
					error: error.toString(),
				})
			);
		}
		return new NextResponse(
			JSON.stringify({ message: 'Login Successful', token: token }),
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error in processing login:', error);
		return new NextResponse(
			JSON.stringify({
				message: 'Error in processing login',
				error: error.toString(),
			})
		);
	}
};
