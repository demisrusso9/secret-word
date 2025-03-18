import { Game } from '@/components/game'
import { StartGame } from '@/components/start-game'
import { Victory } from '@/components/victory'
import { useSecretWord } from '@/context/secret-word'
import { useEffect } from 'react'

function App() {
	const {
		getCategoryAndWord,
		startNewGame,
		startGame,
		isGameWon,
		handlePoints
	} = useSecretWord()

	function handleStartGame() {
		startNewGame()
		getCategoryAndWord()
	}

	useEffect(() => {
		if (isGameWon()) {
			handlePoints()
		}
	}, [isGameWon, handlePoints])

	return (
		<div className='min-h-screen w-full tracking-wide flex flex-col items-center justify-center bg-gray-800'>
			{isGameWon() ? (
				<Victory handleStartGame={handleStartGame} />
			) : startGame ? (
				<Game />
			) : (
				<StartGame handleStartGame={handleStartGame} />
			)}
		</div>
	)
}

export default App
