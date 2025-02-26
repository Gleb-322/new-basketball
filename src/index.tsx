import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './common/components/App'
import GlobalStyle from './globalStyle'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './common/helpers/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<GlobalStyle />
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
)
