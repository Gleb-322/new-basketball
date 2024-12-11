import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './common/components/App'
import GlobalStyle from './globalStyle'
import { BrowserRouter } from 'react-router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<GlobalStyle />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
