export async function register(payload) {
	let user = await fetch('http://localhost:3000/api/users', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: { 'Content-type': 'application/json' },
	});
}

export async function login(payload) {
	try {
		let response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: { 'Content-type': 'application/json' },
		});

		if (!response.ok) {
			// This will catch HTTP errors such as 404 or 500, but not network failures
			throw new Error(
				`Network response was not ok, status: ${response.status}`
			);
		}

		const user = await response.json();
		console.log('user', user);
		return user;
	} catch (error) {
		console.error('Error during login:', error.message);
		return error;
	}
}

export async function authCheck() {
	try {
		const auth = await fetch('/api/authCheck');
		console.log(auth);

		return {
			user: auth?.data,
			error: null,
		};
	} catch (error) {
		console.log(error);
		return {
			user: null,
			error: error,
		};
	}
}
