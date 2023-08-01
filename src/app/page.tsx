export const revalidate = 1
import Link from 'next/link'
import WordSearch from '@/components/WordSearch'
import RandomWordList from '@/components/RandomWordsList'
async function InitialPage() {
	return (
		<div className='flex items-center justify-center flex-col gap-8 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
			<div className='text-center'>
				<h1 className='text-6xl font-semibold text-blue-500 dark:text-sky-400 '>
					Minimalist Dictionary
				</h1>
				<h2 className='mb-2 text-sm'>
					made by:{' '}
					<Link
						className='text-blue-500 dark:text-sky-400 font-semibold'
						href={'https://viktorsouza.vercel.app/'}>
						Viktor
					</Link>
				</h2>
			</div>
			<WordSearch />
			<div className='flex flex-col items-center'>
				<h2 className='mb-2 text-xl'>Random Words</h2>
				<RandomWordList />
			</div>
		</div>
	)
}

export default InitialPage
