import { connectDB } from '../../../../utils/connectDB';
import User from '../../../../lib/models/users';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/router';
export async function POST(req) {
	const router = useRouter();
	try {
		await connectDB();
		const { username, email, password, admin } = await req.json();
		const exist = await User.findOne({ username });
		if (exist) {
			return new NextResponse(
				JSON.stringify({ message: 'Already exist' }),
				{
					status: 500,
				}
			);
		}
		await User.create({ username, email, password, admin });
		router.push('/dashboard');
		return new NextResponse(JSON.stringify({ message: 'registered' }), {
			status: 201,
		});
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ message: 'Something went wrong' + error }),
			{
				status: 500,
			}
		);
	}
}
