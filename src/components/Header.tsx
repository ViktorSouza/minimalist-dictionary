import Link from 'next/link'
import WordSearch from './WordSearch'
import ThemeToggle from './ThemeToggle'
import { signOut } from 'next-auth/react'
import UserOptions from './UserOptions'

export default function Header() {
	return (
		<header className='w-screen py-4 mb-8 border-b  border-slate-300/50 dark:border-slate-900/50'>
			<div className='flex flex-row items-center justify-between gap-2 mx-auto xl:max-w-7xl max-xl:px-5 lg:gap-20'>
				<h1 className='font-semibold lg:text-3xl text-blue-500 dark:text-sky-400'>
					{' '}
					<Link href={'/'}>Minimalist Dictionary</Link>
				</h1>
				<div className='flex gap-3 justify-end flex-grow-[10] sm:justify-between'>
					<div className='flex sm:order-3 gap-3 relative'>
						<ThemeToggle />
						<button
							title='Open options'
							className='peer px-3 py-2 rounded-full bg-slate-200/70 dark:bg-slate-900'>
							<i className='bi bi-person'></i>
						</button>
						<UserOptions />
					</div>
					<div className='flex gap-3'>
						<button
							title='Search a word'
							className='px-3 py-2 rounded-full bg-slate-200/70 dark:bg-slate-900 sm:hidden peer'>
							<i className='bi bi-search'></i>
						</button>
						<div className=' hidden peer-focus-within:flex absolute left-0 sm:relative '>
							<WordSearch />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
