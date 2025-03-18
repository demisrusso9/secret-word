import { ReactNode } from 'react'

export interface SecretWordContextProps {
	isGameStarted: boolean
	selectedCategory: string
	currentWord: string
	score: number
	remainingAttempts: number
	startGame(): void
	selectRandomCategoryAndWord(): void
	revealLetterPositions(positions: number[]): void
	getLetterToDisplay(index: number): string
	hasPlayerWon(): boolean
	incrementScore(): void
	decrementAttempts(): void
	resetGame(): void
}

export interface SecretWordProviderProps {
	children: ReactNode
}
