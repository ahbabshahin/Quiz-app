import connect from '@/lib/db';
import { NextResponse } from 'next/server';
import User from '@/lib/models/users';

export const GET = async () => {
	try {
		await connect();
		const users = await User.find();
		return new NextResponse(JSON.stringify(users), { status: 200 });
	} catch (error) {
		return new NextResponse('Error in fetching users' + error, {
			status: 500,
		});
	}
};

export const POST = async (req) => {
	try {
		const body = await req.json();

		await connect();
		const newUser = new User(body);
		await newUser.save();
		return new NextResponse(
			JSON.stringify({ message: 'User is created', user: newUser }),
			{ status: 201 }
		);
	} catch (error) {
		return new NextResponse('Error in creating user' + error, {
			status: 500,
		});
	}
};

// export const DELETE = async (req) =>{
// 	try {
// 		const {id} = await req.params;
// 	} catch (error) {

// 	}
// }
