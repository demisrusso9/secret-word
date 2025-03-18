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
	const [isGameStarted, setIsGameStarted] = useState(false)

	const [selectedCategory, setSelectedCategory] = useState('')
	const [currentWord, setCurrentWord] = useState('')

	const [score, setScore] = useState(0)
	const [remainingAttempts, setRemainingAttempts] = useState(5)

	const [revealedLetterPositions, setRevealedLetterPositions] = useState<
		number[]
	>([])

	function startGame() {
		setIsGameStarted(true)
		setRevealedLetterPositions([])
	}

	function selectRandomCategoryAndWord() {
		const totalCategories = Object.keys(wordList).length
		const randomCategoryIndex = Math.floor(Math.random() * totalCategories)

		const categoryKey = Object.keys(wordList)[
			randomCategoryIndex
		] as CategoryKey
		const wordsInCategory = Object.values(wordList[categoryKey])

		const randomWordIndex = Math.floor(Math.random() * wordsInCategory.length)
		const randomWord = wordsInCategory[randomWordIndex]

		setSelectedCategory(categoryKey)
		setCurrentWord(randomWord)
	}

	function revealLetterPositions(positions: number[]) {
		const uniquePositions = new Set<number>([
			...revealedLetterPositions,
			...positions
		])

		setRevealedLetterPositions([...uniquePositions])
	}

	function getLetterToDisplay(index: number) {
		return revealedLetterPositions.includes(index) ? currentWord[index] : ''
	}

	function resetGame() {
		setIsGameStarted(false)
		setScore(0)
		setRemainingAttempts(5)
	}

	function decrementAttempts() {
		setRemainingAttempts((prev) => prev - 1)
	}

	const hasPlayerWon = useCallback(() => {
		if (!currentWord) return false

		return revealedLetterPositions.length === currentWord.length
	}, [revealedLetterPositions, currentWord])

	const incrementScore = useCallback(() => {
		setScore((prevScore) => prevScore + 100)
	}, [])

	const contextValue = {
		isGameStarted,
		selectedCategory,
		currentWord,
		score,
		remainingAttempts,
		startGame,
		selectRandomCategoryAndWord,
		revealLetterPositions,
		getLetterToDisplay,
		hasPlayerWon,
		incrementScore,
		decrementAttempts,
		resetGame
	}

	return (
		<SecretWordContext.Provider value={contextValue}>
			{children}
		</SecretWordContext.Provider>
	)
}

export function useSecretWord() {
	return useContext(SecretWordContext)
}
