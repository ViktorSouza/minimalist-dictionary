import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/db/db'
import { NextResponse } from 'next/server'

const createUserSchema = z.object({
	username: z.string().nonempty('Please provide an username'),
	email: z.string().email('Please provide a valid email'),
	password: z.string().nonempty('Please provide a password'),
})
export async function POST(req: Request) {
	//TODO make a better verification
	let bodyUser = createUserSchema.safeParse(await req.json())
	if (!bodyUser.success)
		return NextResponse.json({ error: bodyUser.error.message }, { status: 401 })
	bodyUser.data.password = bcrypt.hashSync(bodyUser.data.password, 10)

	try {
		const user = await prisma.user.create({ data: bodyUser.data })
		//TODO remove password property from user
		return NextResponse.json({ user })
	} catch (error) {
		return NextResponse.json({ error }, { status: 401 })
	}
}
