import { useSecretWord } from '@/context/secret-word'

export function LoseGame() {
	const { points, resetGame } = useSecretWord()

	return (
		<div className='min-h-screen w-full tracking-wide flex flex-col items-center justify-center bg-gray-800'>
			<h1 className='text-5xl mb-10 text-red-500'>Você perdeu</h1>

			<p className='text-white text-base'>Pontuação máxima: {points}</p>

			<button
				className='my-8 text-sm font-bold p-4 bg-red-600 text-gray-200 rounded-3xl transition-colors cursor-pointer hover:bg-red-500'
				onClick={resetGame}
			>
				Tentar novamente
			</button>
		</div>
	)
}
