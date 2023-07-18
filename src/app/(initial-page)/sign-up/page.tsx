'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type ISignUp = {
	email: string
	username: string
	password: string
}
export default function SignUp() {
	const session = useSession()
	const {
		register,
		handleSubmit,
		// watch,
		formState: { errors },
	} = useForm<ISignUp>({})
	const onSubmit: SubmitHandler<ISignUp> = async (data) => {
		const res = await (
			await fetch('/api/user', {
				method: 'POST',
				body: JSON.stringify(data),
			})
		).json()
		signIn('credentials', { ...data, callbackUrl: '/', redirect: true })
	}
	if (session.status == 'authenticated') redirect('/')
	return (
		<div className='max-w-md'>
			<h1 className='text-2xl lg:text-4xl mb-5 font-medium text-blue-900 dark:text-sky-400 '>
				Create account
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-5'>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='username'
						className='text-sm text-slate-500 ml-1 font-medium'>
						Username
					</label>
					<input
						type='text'
						{...register('username', { required: true })}
						className='dark:bg-slate-900 bg-slate-100 rounded-lg px-3 p-2   placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-400'
						placeholder='a_cool_username'
					/>
					{errors.email && (
						<span className='text-red-500 text-sm font-medium ml-1'>
							Please provide an username
						</span>
					)}
				</div>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='email'
						className='text-sm text-slate-500 ml-1 font-medium'>
						Email
					</label>
					<input
						type='email'
						{...register('email', { required: true })}
						className='dark:bg-slate-900 bg-slate-100 rounded-lg px-3 p-2   placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-400'
						placeholder='youremail@example.com'
					/>
					{errors.email && (
						<span className='text-red-500 text-sm font-medium ml-1'>
							The email is required
						</span>
					)}
				</div>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='password'
						className='text-sm text-slate-500 ml-1 font-medium'>
						Password
					</label>
					<input
						className='dark:bg-slate-900 bg-slate-100 rounded-lg px-3 p-2   placeholder:text-slate-500 outline-none focus:ring-2 ring-blue-400'
						type='password'
						{...register('password', { required: true })}
						placeholder='***********'
					/>
					{errors.email && (
						<span className='text-red-500 text-sm font-medium ml-1'>
							The email is required
						</span>
					)}
				</div>
				<div className='flex gap-3 justify-between'>
					<Link
						href={'/login'}
						className='rounded-lg py-2 bg-slate-100 dark:bg-slate-900 w-full border-slate-300 dark:border-slate-900 text-center outline-none focus:ring-2 ring-blue-400  '>
						Login
					</Link>
					<button
						type='submit'
						title='submit'
						className='bg-blue-900 dark:bg-sky-400 w-full rounded-lg py-2  text-white dark:text-slate-950 outline-none focus:ring-2 ring-blue-400'>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	)
}
