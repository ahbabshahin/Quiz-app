// Navbar.js
'use client';
import React from 'react';
import Link from 'next/link';
import '../nav.css';

function Navbar() {
	const logout = async () => {
		try {
			const response = await fetch('/api/logout', { method: 'POST' });
			const data = await response.json();
			console.log(data.message);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};
	return (
		<nav className='navbar'>
			<div className='navContainer'>
				<Link href='/' className='navbar-brand'>
					Home
				</Link>
				<ul className='navbar-nav'>
					<>
						<li>
							<Link href='/dashboard'>Dashboard</Link>
						</li>
						<li>
							<Link href='/dashboard/quiz'>Quiz</Link>
						</li>
						<li>
							<Link href='/dashboard/addQuiz'>Add Quiz</Link>
						</li>

						<li>
							<Link href='/login'>Login</Link>
						</li>
						<li>
							<Link href='/register'>Register</Link>
						</li>
					</>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
