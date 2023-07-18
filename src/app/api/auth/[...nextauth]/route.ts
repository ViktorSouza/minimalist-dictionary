import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions, User } from 'next-auth/core/types'
import { prisma } from '@/db/db'
import bcrypt from 'bcryptjs'
import { authOptions } from '@/lib/next-auth'
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
