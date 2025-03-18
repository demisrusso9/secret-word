import { useSecretWord } from '@/context/secret-word'

interface VictoryProps {
	handleStartGame: () => void
}

export function Victory({ handleStartGame }: VictoryProps) {
	const { score } = useSecretWord()

	return (
		<>
			<h1 className='text-5xl mb-10 text-gray-200'>Você venceu!</h1>

			<p className='text-white text-base'>Pontuação: {score}</p>

			<button
				className='my-8 text-sm font-bold p-4 bg-blue-600 text-gray-200 rounded-3xl transition-colors cursor-pointer hover:bg-blue-500'
				onClick={handleStartGame}
			>
				Jogar novamente
			</button>
		</>
	)
}
