import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function WordsList({
	words,
	className,
}: {
	words: string[]
	className?: string
}) {
	return (
		<ul
			className={twMerge(
				`flex gap-2 max-w-2xl flex-wrap justify-center`,
				className,
			)}>
			{words.map((word) => {
				return (
					<li
						key={word}
						className='px-2 bg-slate-300 dark:bg-gray-900 rounded-md'>
						<Link href={`/word/${word}`}>{word}</Link>
					</li>
				)
			})}
		</ul>
	)
}
