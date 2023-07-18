import axios from 'axios'
import { IWords } from '../types/IWords'

export async function fetchDict(word: string): Promise<IWords[] | 'Not Found'> {
	const url = new URL(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	try {
		let res = await fetch(url.toString(), { next: { revalidate: Infinity } })
		let wordRes = (await res.json()) as IWords[] | { title: string }
		if (wordRes?.title === 'No Definitions Found') return 'Not Found'
		return wordRes
	} catch (error) {
		return 'Not Found'
	}
}

export async function getWordFrequency(word: string): Promise<any> {
	const url = new URL(
		`https://books.google.com/ngrams/json?content=${word}&smoothing=8&corpus=en-2019&year_start=1800`,
	)
	let res = await fetch(url.toString(), { next: { revalidate: Infinity } })
	res = await res.json()
	return res[0]?.timeseries
}

export async function bookmarkWord(word: string) {
	const res = await fetch('/api/user/favorite-words', {
		body: JSON.stringify({ word }),
		method: 'POST',
	})
}
export async function unbookmarkWord(word: string) {
	const res = await fetch('/api/user/favorite-words', {
		body: JSON.stringify({ word }),
		method: 'DELETE',
	})
}
export async function getFavoriteWords() {
	const res = await (await fetch('/api/user/favorite-words')).json()
	return res.favoriteWords
}
