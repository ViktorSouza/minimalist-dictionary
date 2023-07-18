import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import { prisma } from '@/db/db'
import { z } from 'zod'

export async function GET() {
	const user = await getCurrentUser()
	if (!user)
		return NextResponse.json(
			{ error: 'You must be logged in' },
			{ status: 403 },
		)
	const userDB = await prisma.user.findUnique({
		where: {
			email: user.email,
		},
	})
	if (!userDB)
		return NextResponse.json({ error: 'User not found' }, { status: 404 })

	return NextResponse.json({
		favoriteWords: userDB.favoriteWords,
	})
}
export async function POST(req: Request) {
	const user = await getCurrentUser()
	let body = z.object({ word: z.string() }).safeParse(await req.json())

	if (!body.success)
		return NextResponse.json(
			{ error: 'Please provide a word' },
			{ status: 400 },
		)

	if (!user)
		return NextResponse.json(
			{ error: 'You must be logged in' },
			{ status: 403 },
		)

	const userDB = await prisma.user.findUnique({
		where: {
			email: user.email,
		},
	})
	if (!userDB)
		return NextResponse.json({ error: 'User not found' }, { status: 404 })

	await prisma.user.update({
		where: {
			email: user.email,
		},
		data: {
			favoriteWords: {
				set: [...userDB.favoriteWords, body.data.word],
			},
		},
	})
	return NextResponse.json({ message: 'OK' })
}

export async function DELETE(req: Request) {
	const user = await getCurrentUser()
	let body = z.object({ word: z.string() }).safeParse(await req.json())

	if (body.success === false)
		return NextResponse.json(
			{ error: 'Please provide a word' },
			{ status: 400 },
		)

	if (!user)
		return NextResponse.json(
			{ error: 'You must be logged in' },
			{ status: 403 },
		)

	const userDB = await prisma.user.findUnique({
		where: {
			email: user.email,
		},
	})
	if (!userDB)
		return NextResponse.json({ error: 'User not found' }, { status: 404 })
	await prisma.user.update({
		where: {
			email: user.email,
		},
		data: {
			favoriteWords: {
				set: userDB.favoriteWords.filter((word) => {
					//The body.data is giving error
					return word !== (body.success && body.data.word)
				}),
			},
		},
	})
	return NextResponse.json({ message: 'OK' })
}
