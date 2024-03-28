'use client';
import React, { useState } from 'react';
import '../auth.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
function Login() {
	const router = useRouter();
	const initialState = {
		email: '',
		password: '',
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
		if (!formData.email || !formData.password) {
			setError('must provide all credential');
		}

		try {
			setPending(true);
			const res = await signIn('credentials', {
				email: formData.email,
				password: formData.password,
				redirect: false,
			});

			if (res?.error) {
				setError('Invalid cred');
				setPending(false);
				return;
			}
			router.replace('/dashboard');
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
				className='mt-3 space-y-6 bg-white p-8 rounded-lg shadow-md'
			>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email
					</label>
					<input
						type='text'
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
