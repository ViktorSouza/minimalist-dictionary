import { NextAuthOptions, getServerSession } from 'next-auth'
import { authOptions } from './next-auth'

export async function getCurrentUser() {
	const session = await getServerSession<NextAuthOptions>(authOptions)
	return session?.user
}
