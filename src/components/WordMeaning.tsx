'use client'
import Link from 'next/link'
import { useEffect, useState, useRef, useCallback } from 'react'
import { IWords } from '../types/IWords'
import { signIn, useSession } from 'next-auth/react'

import {
	bookmarkWord,
	getFavoriteWords,
	unbookmarkWord,
} from '../utils/dictionary'

export default function WordMeaning({
	word,
	wordFrequency,
}: {
	word: IWords
	wordFrequency?: number[]
}) {
	const audioRef = useRef<HTMLAudioElement>(null)
	// const audio = new Audio(word?.phonetics[0]?.audio)
	let session = useSession()

	//TODO add an option to choose the voice
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
	const [msg, setMsg] = useState<SpeechSynthesisUtterance>()

	const populateVoiceList = useCallback(() => {
		const newVoices = speechSynthesis.getVoices()
		setVoices(newVoices)
		const speech = new SpeechSynthesisUtterance(word.word)
		speech.voice = newVoices[112]
		setMsg(speech)
	}, [word.word])

	useEffect(() => {
		if ('speechSynthesis' in window) populateVoiceList()
		if (speechSynthesis.onvoiceschanged == undefined) {
			speechSynthesis.onvoiceschanged = populateVoiceList
		}
	}, [word.word, populateVoiceList])

	const [favoriteWords, setFavoriteWords] = useState<string[]>([])
	useEffect(() => {
		getFavoriteWords().then((res) => setFavoriteWords(res))
	}, [])
	return (
		<section className='w-full  lg:max-w-3xl'>
			<section>
				<div className='flex justify-between'>
					<h1 className='text-4xl font-semibold text-blue-500 dark:text-sky-400'>
						{word.word}
					</h1>

					<button
						className='bg-amber-200/70 hover:bg-yellow-200/50 dark:bg-yellow-950 hover:dark:bg-yellow-900 text-amber-600 dark:text-yellow-300 transition-colors rounded-full px-3 disabled:opacity-50'
						title='Bookmark this word'
						onClick={async () => {
							if (session.status === 'unauthenticated') signIn()
							favoriteWords?.includes(word.word)
								? await unbookmarkWord(word.word)
								: await bookmarkWord(word.word)
							getFavoriteWords().then((res) => setFavoriteWords(res))
						}}>
						{favoriteWords?.includes(word.word.trim()) ? (
							<i className='bi bi-bookmark-fill'></i>
						) : (
							<i className='bi bi-bookmark'></i>
						)}
					</button>
				</div>
				<audio
					ref={audioRef}
					src={word?.phonetics[0]?.audio}></audio>
				<div className='flex gap-3 my-2'>
					<button
						title='listen audio'
						disabled={!word?.phonetics[0]?.audio && msg == undefined}
						className='bg-blue-200/70 hover:bg-blue-200/50 dark:bg-sky-950 hover:dark:bg-sky-900 text-blue-800 dark:text-sky-400 transition-colors rounded-full px-1 disabled:opacity-50'
						onClick={() => {
							word?.phonetics[0]?.audio
								? audioRef.current!.play()
								: //If there is no voice, the button will be disabled, so we can make this assertion
								  window.speechSynthesis.speak(msg as SpeechSynthesisUtterance)
						}}>
						<i className='bi bi-volume-up'></i>
					</button>
					{word.phonetics[0]?.text && (
						<span className='text-slate-700 dark:text-slate-400'>
							{word.phonetics[0].text}
						</span>
					)}
				</div>
				{word.meanings.map((meaning) => (
					<div
						key={meaning.partOfSpeech}
						className='flex flex-col mb-3'>
						<h2 className='text-xl font-medium mb-1 mt-2 text-amber-600 dark:text-yellow-300'>
							{meaning.partOfSpeech}
						</h2>
						{meaning.synonyms.length > 0 && (
							<div className='mb-3'>
								<h3 className='font-medium mb-1'>Synonyms</h3>
								<ul className='flex gap-2 flex-wrap mb-2'>
									{meaning.synonyms.map((synonym) => (
										<li
											key={synonym}
											className='bg-blue-200/70 dark:bg-sky-950 text-blue-800 dark:text-sky-400 px-2 text-sm rounded-full'>
											<Link href={`/word/${synonym}`}>{synonym}</Link>
										</li>
									))}
								</ul>
							</div>
						)}
						{meaning.antonyms.length > 0 && (
							<div className='mb-3'>
								<h3 className='font-medium mb-1'>Antonyms</h3>
								<ul className='flex gap-2 flex-wrap mb-2'>
									{meaning.antonyms.map((antonyms) => (
										<li
											key={antonyms}
											className='bg-amber-200/70 dark:bg-sky-950 text-amber-800 dark:text-sky-400 px-2 text-sm rounded-full'>
											<Link href={`/word/${antonyms}`}>{antonyms}</Link>
										</li>
									))}
								</ul>
							</div>
						)}
						<ol className='list-decimal ml-5  space-y-3 marker:text-slate-400 dark:marker:text-slate-600 marker:font-medium'>
							{meaning.definitions.map((def) => {
								return (
									<li key={def.definition}>
										<p className='break-words'>{def.definition}</p>
										{def.example !== undefined && (
											<q className='text-blue-500 dark:text-sky-400 font-medium text-sm'>
												{def.example}
											</q>
										)}
									</li>
								)
							})}
						</ol>
					</div>
				))}
			</section>
		</section>
	)
}
