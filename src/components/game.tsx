import { useSecretWord } from '@/context/secret-word'
import { useState } from 'react'
import { LoseGame } from './lose-game'

export function Game() {
	const {
		selectedCategory,
		currentWord,
		score,
		remainingAttempts,
		revealLetterPositions,
		decrementAttempts,
		getLetterToDisplay
	} = useSecretWord()

	const [letter, setLetter] = useState('')
	const [usedLetters, setUsedLetters] = useState([] as string[])

	function handleGuess() {
		if (!letter) return

		const matchedPositions: number[] = []
		const wordCharacters = currentWord.toLowerCase().split('')

		wordCharacters.map((char, index) => {
			if (char === letter.toLowerCase()) {
				matchedPositions.push(index)
			}
		})

		if (!wordCharacters.includes(letter) && !usedLetters.includes(letter)) {
			setUsedLetters([...usedLetters, letter])
			decrementAttempts()
		}

		setLetter('')
		revealLetterPositions(matchedPositions)
	}

	return (
		<div className='w-full max-w-[720px]'>
			{remainingAttempts > 0 ? (
				<>
					<h1 className='text-4xl text-gray-100 text-center mb-20'>
						Adivinhe a palavra
					</h1>

					<p className='text-base text-gray-100 text-center'>
						Tentativa(s): {remainingAttempts}
					</p>

					<h3 className='text-base text-gray-100 text-center mb-6'>
						Dica sobre a palavra:{' '}
						<span className='font-bold text-blue-600 tracking-wide'>
							{selectedCategory}
						</span>
					</h3>

					<p className='text-base text-gray-100'>Pontuação: {score}</p>

					<div className='h-20 w-full border border-gray-100 flex items-center justify-center rounded-lg my-4 p-12'>
						<section className='flex items-center justify-center gap-1'>
							{Array.from({ length: currentWord.length }).map((_, index) => {
								return (
									<div
										key={index}
										className='h-12 w-12 border-2 border-gray-100 flex text-gray-100 text-2xl uppercase items-center justify-center rounded-lg mx-1'
									>
										{getLetterToDisplay(index)}
									</div>
								)
							})}
						</section>
					</div>

					<p className='text-base text-gray-100 text-center'>
						Tente adivinhar uma letra da palavra:
					</p>

					<div className='flex items-center justify-center gap-4'>
						<input
							type='text'
							className='text-base text-black rounded p-2 my-2 font-bold bg-gray-100 border w-10 text-center'
							maxLength={1}
							value={letter}
							onChange={(e) => setLetter(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
							autoFocus
						/>

						<button
							className='my-8 text-sm font-bold p-2 bg-blue-600 text-gray-200 border rounded transition-colors cursor-pointer hover:bg-blue-500'
							onClick={handleGuess}
						>
							Jogar!
						</button>
					</div>

					<div>
						<p className='text-base text-gray-100'>
							Letras já usadas: {usedLetters.map((l) => l).join(', ')}
						</p>
					</div>
				</>
			) : (
				<LoseGame />
			)}
		</div>
	)
}
