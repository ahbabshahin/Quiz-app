import { CredentialsProvider } from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
export const authOptions = {
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials) {
				try {
					console.log({ credentials });
				} catch (error) {
					console.log('error ' + error);
					return null;
				}
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
