import Link from 'next/link'
import WordsList from './WordsList'

export default async function RandomWordList({
	className,
}: {
	className?: string
}) {
	const randomWords = await (
		await fetch('https://random-word-api.vercel.app/api?words=20', {})
	).json()
	return <WordsList words={randomWords} />
}
