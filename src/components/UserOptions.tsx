'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function UserOptions() {
	return (
		<ul className='hidden peer-focus-within:flex flex-col hover:flex focus-within:flex absolute top-0 right-0 mt-10  rounded-md dark:shadow-none shadow-md bg-slate-200 dark:bg-slate-900 w-44'>
			<StylizedLi>
				<Link href={'/user'}>
					<i className='bi bi-person mr-2'></i>My account
				</Link>
			</StylizedLi>
			<StylizedLi>
				<Link href={'/settings'}>
					<i className='bi bi-gear mr-1'></i> Settings
				</Link>
			</StylizedLi>
			<StylizedLi>
				<button onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
					<i className='bi bi-box-arrow-left mr-1'></i> Logout
				</button>
			</StylizedLi>
		</ul>
	)
}

function StylizedLi({ children }: { children: React.ReactNode }) {
	return (
		<li className='hover:bg-slate-300 dark:hover:bg-slate-800 py-2 px-3 rounded-md'>
			{children}
		</li>
	)
}
