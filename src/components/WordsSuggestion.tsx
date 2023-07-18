'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import WordsList from './WordsList'
export default function WordsSuggestion() {
	const params = useParams()
	const [maybeWords, setMaybeWords] = useState<
		{
			word: string
			score: number
		}[]
	>([])
	useEffect(() => {
		fetch(`https://api.datamuse.com/sug?s=${params.word}`)
			.then((res) => res.json())
			.then((res) => setMaybeWords(res))
	})
	return <WordsList words={maybeWords.map((word) => word.word)} />
}
