'use client';
import React, { useState } from 'react';
import '@/app/auth.css';
import { addQuiz } from '@/lib/quizApi';
function AddQuiz() {
	const [formData, setFormData] = useState({
		quizName: '',
		id: '',
		question: '',
		options: ['', '', '', ''],
		answer: '',
	});
	const [touched, setTouched] = useState({
		quizName: false,
		question: false,
		id: false,
		options: [false, false, false, false],
		answer: false,
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		let newFormData = { ...formData };

		if (name.startsWith('options')) {
			const index = parseInt(name.split('[')[1], 10);
			newFormData.options[index] = value;
		} else {
			newFormData[name] = value;
		}

		setFormData(newFormData);
		if (touched[name]) {
			validate(name, value);
		}
	};

	const handleOptionChange = (index, value) => {
		const newOptions = formData.options.map((option, i) =>
			i === index ? value : option
		);
		setFormData({ ...formData, options: newOptions });
		if (touched.options[index]) {
			validate(`options[${index}]`, value);
		}
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
		validate(name, e.target.value);
	};

	const validate = (name, value) => {
		let newErrors = { ...errors };

		if (value.trim() === '') {
			newErrors[name] = 'This field is required';
		} else {
			delete newErrors[name];
		}

		setErrors(newErrors);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		Object.keys(formData).forEach((name) => {
			if (name === 'options') {
				formData.options.forEach((option, index) =>
					validate(`options[${index}]`, option)
				);
			} else {
				validate(name, formData[name]);
			}
		});

		if (Object.keys(errors).length === 0) {
			console.log('Form data submitted:', formData);
			const str = sessionStorage.getItem('userId');
			let userId;
			if (str) userId = JSON.parse(str);

			let payload = {
				createdBy: userId,
			};

			payload = { ...formData };
			await addQuiz(payload);
		}
	};

	return (
		<div className='container'>
			<form
				onSubmit={handleSubmit}
				className='mt-3 space-y-6 bg-white p-8 rounded-lg shadow-md'
			>
				<div>
					<label
						htmlFor='quizName'
						className='block text-sm font-medium text-gray-700'
					>
						Quiz Name
					</label>
					<input
						type='text'
						name='quizName'
						id='quizName'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.quizName}
						onChange={handleChange}
						onBlur={handleBlur}
						required
					/>
					{touched.quizName && errors.quizName && (
						<div className='text-sm text-red-500'>
							{errors.quizName}
						</div>
					)}
				</div>
				<div>
					<label
						htmlFor='id'
						className='block text-sm font-medium text-gray-700'
					>
						Id
					</label>
					<input
						type='text'
						name='id'
						id='id'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.id}
						onChange={handleChange}
						onBlur={handleBlur}
						required
					/>
					{touched.id && errors.id && (
						<div className='text-sm text-red-500'>{errors.id}</div>
					)}
				</div>

				<div>
					<label
						htmlFor='question'
						className='block text-sm font-medium text-gray-700'
					>
						Question
					</label>
					<input
						type='text'
						name='question'
						id='question'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.question}
						onChange={handleChange}
						onBlur={handleBlur}
						required
					/>
					{touched.question && errors.question && (
						<div className='text-sm text-red-500'>
							{errors.question}
						</div>
					)}
				</div>
				{formData.options.map((option, index) => (
					<div key={index}>
						<label
							htmlFor={`options[${index}]`}
							className='block text-sm font-medium text-gray-700'
						>
							Option {index + 1}
						</label>
						<input
							type='text'
							name={`options[${index}]`}
							id={`options[${index}]`}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							value={option}
							onChange={(e) =>
								handleOptionChange(index, e.target.value)
							}
							onBlur={handleBlur}
							required
						/>
						{touched.options[index] &&
							errors[`options[${index}]`] && (
								<div className='text-sm text-red-500'>
									{errors[`options[${index}]`]}
								</div>
							)}
					</div>
				))}

				{/* Correct Answer */}
				<div>
					<label
						htmlFor='answer'
						className='block text-sm font-medium text-gray-700'
					>
						Correct Answer
					</label>
					<input
						type='text'
						name='answer'
						id='answer'
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						value={formData.answer}
						onChange={handleChange}
						onBlur={handleBlur}
						required
					/>
					{touched.answer && errors.answer && (
						<div className='text-sm text-red-500'>
							{errors.answer}
						</div>
					)}
				</div>
				<div className='flex items-center justify-end'>
					<button
						type='submit'
						className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Submit Quiz
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddQuiz;
