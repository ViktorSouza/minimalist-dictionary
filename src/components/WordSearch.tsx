'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function WordSearch({ className }: { className?: string }) {
	const [word, setWord] = useState('')
	const router = useRouter()
	useEffect(() => {
		// console.log(word)
	}, [word])

	return (
		<div
			className={twMerge(
				'dark:bg-slate-900 w-full lg:w-72 xl:w-96  bg-slate-300 focus-within:bg-transparent flex px-4 py-2 rounded-full justify-between gap-2 outline-none focus-within:ring-2  ring-blue-400 dark:ring-sky-400 max-sm:top-16 sm:flex sm:mx-auto',
				className,
			)}>
			<input
				type='text'
				value={word}
				onChange={(e) => setWord(e.currentTarget.value)}
				className='bg-transparent outline-none shrink w-full'
				placeholder='Search a word'
			/>
			<button
				title='search word'
				onClick={() => {
					console.log('Redirecting')
					router.push(`/word/${word}`)
				}}
				className='shrink-0'>
				<i className='bi bi-search'></i>
			</button>
		</div>
	)
}
