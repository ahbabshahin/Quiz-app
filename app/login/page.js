'use client';
import React, { useState } from 'react';
import '../auth.css';
import { login } from '@/lib/api';

function Login() {
	const initialState = {
		username: '',
		password: '',
	};
	const [formData, setFormData] = useState(initialState);

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
		await login(formData);
		setFormData(initialState);
	};

	return (
		<div className='container'>
			<form
				onSubmit={handleSubmit}
				className='mt-3 space-y-6 bg-white p-8 rounded-lg shadow-md'
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
					<button
						type='submit'
						className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
