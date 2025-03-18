import { ReactNode } from 'react'

export interface SecretWordContextProps {
	startGame: boolean
	category: string
	word: string
	points: number
	startNewGame(): void
	getCategoryAndWord(): void
	addCorrectLetterPositions(positions: number[]): void
	renderByLetter(index: number): string
	isGameWon(): boolean
	handlePoints(): void
}

export interface SecretWordProviderProps {
	children: ReactNode
}
