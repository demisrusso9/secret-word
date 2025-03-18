import { ReactNode } from 'react'

export interface SecretWordContextProps {
	startGame: boolean
	category: string
	word: string
	points: number
	tries: number
	startNewGame(): void
	getCategoryAndWord(): void
	addCorrectLetterPositions(positions: number[]): void
	renderByLetter(index: number): string
	isGameWon(): boolean
	handlePoints(): void
	decreaseTries(): void
	resetGame(): void
}

export interface SecretWordProviderProps {
	children: ReactNode
}
