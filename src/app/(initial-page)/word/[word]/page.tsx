import { fetchDict, getWordFrequency } from '@/utils/dictionary'
import WordMeaning from '@/components/WordMeaning'
import RandomWordList from '@/components/RandomWordsList'
import WordFrequencyChart from '@/components/WordFrequencyChart'
import { notFound } from 'next/navigation'
import WordsList from '../../../../components/WordsList'

export default async function RandomWord({
	params,
}: {
	params: { word: string }
}) {
	const [words, wordFrequency] = await Promise.all([
		fetchDict(params.word),
		getWordFrequency(params.word),
	])

	if (words == 'Not Found') notFound()

	return (
		<div className='lg:grid max-lg:space-y-16 grid-cols-8 items-start lg:gap-32'>
			<div className='space-y-12 col-span-5'>
				{words.map((word, index) => (
					<WordMeaning
						wordFrequency={wordFrequency}
						key={word.word + index}
						word={word}
					/>
				))}
			</div>
			<div className='space-y-5 col-span-3'>
				<h2 className='mb-3 text-xl'>Word Frequency 1800~2019</h2>
				<WordFrequencyChart wordFrequency={wordFrequency || []} />
				<div>
					<h2 className='mb-2 text-xl'>Related words</h2>
					{/* <ul className='flex gap-2 max-w-2xl flex-wrap '> */}
					<SimilarWords params={params} />
				</div>
				<div>
					<h2 className='mb-2 text-xl'>Other words</h2>
					<RandomWordList className='' />
				</div>
			</div>
		</div>
	)
}

async function SimilarWords({ params }: { params: { word: string } }) {
	const similarWords: {
		word: string
		score: number
		tags: string[]
	}[] = (
		(await (
			await fetch(`https://api.datamuse.com/words?ml=${params.word}`, {
				next: { revalidate: Infinity },
			})
		).json()) as []
	).slice(0, 15)

	return <WordsList words={similarWords.map((word) => word.word)} />
}
