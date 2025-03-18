import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SecretWordProvider } from './context/secret-word.tsx'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SecretWordProvider>
			<App />
		</SecretWordProvider>
	</StrictMode>
)
