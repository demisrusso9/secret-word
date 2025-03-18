import {
	SecretWordContextProps,
	SecretWordProviderProps
} from '@/@types/context-types'
import { wordList } from '@/data'
import { createContext, useCallback, useContext, useState } from 'react'

type WordListType = typeof wordList
type CategoryKey = keyof WordListType

export const SecretWordContext = createContext({} as SecretWordContextProps)

export function SecretWordProvider({ children }: SecretWordProviderProps) {
	const [startGame, setStartGame] = useState(false)

	const [category, setCategory] = useState('')
	const [word, setWord] = useState('')

	const [points, setPoints] = useState(0)
	const [tries, setTries] = useState(5)

	const [correctLettersPositions, setCorrectLettersPositions] = useState<
		number[]
	>([])

	function startNewGame() {
		setStartGame(true)
		setCorrectLettersPositions([])
	}

	function getCategoryAndWord() {
		const total = Object.keys(wordList).length
		const randomNumber = Math.floor(Math.random() * total)

		const categoryKey = Object.keys(wordList)[randomNumber] as CategoryKey
		const categoryValues = Object.values(wordList[categoryKey])

		const randomNumberForWord = Math.floor(
			Math.random() * categoryValues.length
		)
		const wordKey = categoryValues[randomNumberForWord]

		setCategory(categoryKey)
		setWord(wordKey)
	}

	function addCorrectLetterPositions(positions: number[]) {
		const removeDuplicates = new Set<number>()

		const allNumbers = [...correctLettersPositions, ...positions]
		allNumbers.forEach((number) => removeDuplicates.add(number))

		const correctPositions = [...removeDuplicates.values()]
		setCorrectLettersPositions([...correctPositions])
	}

	function renderByLetter(index: number) {
		return correctLettersPositions.includes(index) ? word[index] : ''
	}

	function resetGame() {
		setStartGame(false)
		setPoints(0)
		setTries(5)
	}

	function decreaseTries() {
		setTries((prev) => prev - 1)
	}

	const isGameWon = useCallback(() => {
		if (!word) return false

		return correctLettersPositions.length === word.length
	}, [correctLettersPositions, word])

	const handlePoints = useCallback(() => {
		setPoints((prevPoints) => prevPoints + 100)
	}, [])

	const value = {
		startGame,
		category,
		word,
		points,
		tries,
		startNewGame,
		getCategoryAndWord,
		addCorrectLetterPositions,
		renderByLetter,
		isGameWon,
		handlePoints,
		decreaseTries,
		resetGame
	}

	return (
		<SecretWordContext.Provider value={value}>
			{children}
		</SecretWordContext.Provider>
	)
}

export function useSecretWord() {
	return useContext(SecretWordContext)
}
