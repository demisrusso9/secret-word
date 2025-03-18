interface StartGameProps {
	handleStartGame: () => void
}

export function StartGame({ handleStartGame }: StartGameProps) {
	return (
		<>
			<h1 className='text-5xl mb-10 text-gray-200'>Secret Word</h1>

			<p className='text-white text-base'>
				Clique no botão abaixo pra começar a jogar
			</p>

			<button
				className='my-8 text-sm font-bold p-4 bg-blue-600 text-gray-200 rounded-3xl transition-colors cursor-pointer hover:bg-blue-500'
				onClick={handleStartGame}
			>
				Começar Jogo
			</button>
		</>
	)
}
