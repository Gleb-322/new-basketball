import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './common/components/App'
import GlobalStyle from './globalStyle'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './common/helpers/AuthContext'
import { StyledEngineProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<GlobalStyle />
		<BrowserRouter>
			<AuthProvider>
				<StyledEngineProvider injectFirst>
					<App />
				</StyledEngineProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
)
