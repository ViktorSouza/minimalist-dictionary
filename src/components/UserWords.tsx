'use client'
import { useSession } from 'next-auth/react'
import {
	fetchDict,
	getFavoriteWords,
	unbookmarkWord,
} from '../utils/dictionary'
import { useEffect, useState } from 'react'
import { IWords } from '../types/IWords'

export default function UserWords() {
	const [words, setWords] = useState([])
	useEffect(() => {
		getFavoriteWords().then((words) => setWords(words))
	})

	return (
		<ul className='gap-5 grid grid-cols-5'>
			{words.map((word) => (
				<Word
					key={word}
					word={word}
					setWords={setWords}
				/>
			))}
		</ul>
	)
}

function Word({
	word,
	setWords,
}: {
	word: string
	setWords: React.Dispatch<React.SetStateAction<never[]>>
}) {
	const [wordMeaning, setWordMeaning] = useState<IWords>({
		meanings: [],
		word: '',
		phonetics: [],
		license: { name: '', url: '' },
		phonetic: '',
		sourceUrls: [],
	})
	useEffect(() => {
		fetchDict(word).then((res) => setWordMeaning(res[0] as IWords))
	}, [word])
	return (
		<li
			key={word}
			className='rounded-md p-3 bg-gray-100 dark:bg-gray-900 shadow-md dark:shadow-none'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-semibold'>{word}</h1>
				<button
					title='unbookmark'
					className='right-0'
					onClick={() => {
						unbookmarkWord(word).then(() => {
							getFavoriteWords().then((words) => setWords(words))
							// setWords((curr) => curr.filter((w) => w != word))
						})
					}}>
					<i className='bi bi-x'></i>
				</button>
			</div>
			<p>{wordMeaning.meanings[0]?.definitions[0]?.definition ?? ''}</p>
		</li>
	)
}
