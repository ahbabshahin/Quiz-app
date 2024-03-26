export async function register(payload) {
	let user = await fetch('http://localhost:3000/api/users', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: { 'Content-type': 'application/json' },
	});
}

export async function login(payload) {
	let user = await fetch('http://localhost:3000/api/login', {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: { 'Content-type': 'application/json' },
	});
}
