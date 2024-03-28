'use client';
import { authCheck } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../components/Nav';

export default function DashboardLayout({ children }) {
	return (
		<html lang='en'>
			{/* <Navbar /> */}
			<body>{children}</body>
		</html>
	);
}
