import { NextResponse } from 'next/server';
import handler from '../api/(auth)/logout/route';

export default function Logout() {
	handler();
}
