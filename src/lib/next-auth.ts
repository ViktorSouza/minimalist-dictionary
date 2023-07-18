import { AuthOptions, User } from 'next-auth'
import { prisma } from '../db/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
		newUser: '/sign-up',
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id
			}
			return token
		},
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					email: session.user.email,
					username: token.name,
					id: token.id,
				},
			}
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				if (credentials == undefined) return null

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				})
				if (!user) return null
				if (!bcrypt.compareSync(credentials.password, user.password))
					return null
				const responseObject = {
					email: user.email,
					id: user.id,
					username: user.username,
					name: user.username,
				} as any
				return responseObject as User
			},
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'youremail@example.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '************',
				},
			},
		}),
	],

	// Configure one or more authentication providers
}
