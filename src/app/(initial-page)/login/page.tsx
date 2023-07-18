'use client'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

type ILogin = {
	email: string
	password: string
}
export default function LoginPage() {
	const session = useSession()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogin>({})
	const onSubmit: SubmitHandler<ILogin> = (data) => {
		signIn('credentials', { callbackUrl: '/', redirect: true, ...data })
	}

	if (session.status == 'authenticated') redirect('/')
	return (
		<div className='max-w-md mx-auto'>
			<h1 className='text-2xl lg:text-4xl mb-5 font-medium text-6ky-900 dark:text-sky-400 text-center'>
				Login
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-5'>
				<div className='flex flex-col gap-1'>
					<label
						htmlFor='input'
						className='text-sm text-slate-500 ml-1 font-medium'>
						Email
					</label>
					<input
						type='email'
						{...register('email', { required: true })}
						id='input'
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
						id='password'
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
						href={'/sign-up'}
						className='rounded-lg py-2 bg-slate-100 dark:bg-slate-900 w-full border-slate-300 dark:border-slate-900 text-center outline-none focus:ring-2 ring-blue-600  '>
						Sign up
					</Link>
					<button
						type='submit'
						title='submit'
						className='bg-blue-500 dark:bg-sky-400 w-full rounded-lg py-2  text-white dark:text-slate-950 outline-none focus:ring-2 ring-blue-400'>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}
