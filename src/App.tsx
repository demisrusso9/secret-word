import { Game } from '@/components/game'
import { StartGame } from '@/components/start-game'
import { Victory } from '@/components/victory'
import { useSecretWord } from '@/context/secret-word'
import { useEffect } from 'react'

function App() {
	const {
		isGameStarted,
		hasPlayerWon,
		incrementScore,
		startGame,
		selectRandomCategoryAndWord
	} = useSecretWord()

	function handleStartGame() {
		startGame()
		selectRandomCategoryAndWord()
	}

	useEffect(() => {
		if (hasPlayerWon()) {
			incrementScore()
		}
	}, [hasPlayerWon, incrementScore])

	return (
		<div className='min-h-screen w-full tracking-wide flex flex-col items-center justify-center bg-gray-800'>
			{hasPlayerWon() ? (
				<Victory handleStartGame={handleStartGame} />
			) : isGameStarted ? (
				<Game />
			) : (
				<StartGame handleStartGame={handleStartGame} />
			)}
		</div>
	)
}

export default App
