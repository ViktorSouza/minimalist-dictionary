import Link from 'next/link'
import RandomWordList from '../../../../components/RandomWordsList'
import NotFoundText from '../../../../components/NotFoundText'
import WordsSuggestion from '../../../../components/WordsSuggestion'

export default function WordNotFound() {
	return (
		<div className='flex flex-col gap-8 items-center lg:text-center xl:fixed xl:-translate-x-1/2 xl:-translate-y-1/2 xl:top-1/2 xl:left-1/2'>
			<NotFoundText />
			<div className='flex flex-col items-center'>
				<h2 className='mb-2 text-xl font-semibold'>Perhaps you mean</h2>
				<WordsSuggestion />
			</div>
			<div className='flex flex-col items-center'>
				<p className='font-medium mb-2'>
					Should you desire to do so, you possess the liberty to cast your
					discerning gaze upon these lexemes.
				</p>
				<RandomWordList className='' />
			</div>
		</div>
	)
}
