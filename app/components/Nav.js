// Navbar.js
'use client';
import React from 'react';
import Link from 'next/link';
import '../nav.css';
function Navbar() {
	return (
		<nav className='navbar'>
			<div className='navContainer'>
				<Link href='/' className='navbar-brand'>
					Home
				</Link>
				<ul className='navbar-nav'>
					<li>
						<Link href='/quiz'>Quiz</Link>
					</li>
					<li>
						<Link href='/register'>Register</Link>
					</li>
					<li>
						<Link href='/login'>Login</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

/* <nav>
					<Link href='/quiz'>Quiz</Link>
					<Link href='/login'>Login</Link>
				</nav> */

export default Navbar;
