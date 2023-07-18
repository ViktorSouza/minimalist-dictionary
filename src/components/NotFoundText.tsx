'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function NotFoundText() {
	const params = useParams()
	return (
		<h1 className='text-2xl lg:text-3xl leading-relaxed font-semibold mb-3 '>
			<L>Regrettably</L>, it seems that our <L>diligent</L> pursuit for the
			specific <L>lexical</L> entity known as &quot;
			{decodeURI(params.word as string)}
			&quot; has <L>yielded</L> an <L>unfavorable</L> outcome, leaving us{' '}
			<L>empty-handed</L> in our quest for <L>linguistic</L> discovery.
		</h1>
	)
}
function L({ children }: { children: React.ReactNode }) {
	return (
		<Link
			href={`/word/${children}`}
			className='dark:text-sky-400 text-blue-500 underline'>
			{children}
		</Link>
	)
}
