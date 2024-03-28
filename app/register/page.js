'use client';
import React, { useState } from 'react';
import '../auth.css';

function Registration() {
	const initialState = {
		username: '',
		email: '',
		password: '',
		admin: false,
	};
	const [formData, setFormData] = useState(initialState);
	const [error, setError] = useState('');
	const [pending, setPending] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Form data submitted:', formData);
		if (!formData.username || !formData.email || !formData.password) {
			setError('must provide all credential');
		}
		try {
			setPending(true);
			const res = await fetch('http://localhost:3000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				setPending(false);
				setFormData(initialState);
			} else {
				setPending(false);
				const err = res.json();
				setError(err.message());
				console.log('something went wrong');
			}
		} catch (error) {
			setPending(false);
			setError('something went wrong');
		}
		setFormData(initialState);
	};

	return (
		<div className='container'>
			<form
				onSubmit={handleSubmit}
				className=' space-y-6 bg-white p-8 rounded-lg shadow-md'
			>
				<div>
					<label
						htmlFor='username'
						className='block text-sm font-medium text-gray-700'
					>
						Username
					</label>
					<input
						type='text'
						name='username'
						id='username'
						autoComplete='username'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						autoComplete='email'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						autoComplete='new-password'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='flex items-center justify-end'>
					{error && <span>{error}</span>}
					<button
						type='submit'
						className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
}

export default Registration;
