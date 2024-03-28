// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Home() {
	// const { userId } = auth();
	// if (userId) {
	// 	console.log(userId);
	// 	redirect('/dashboard');
	// }

	return (
		<main>
			<h1>Quiz App</h1>
		</main>
	);
}
