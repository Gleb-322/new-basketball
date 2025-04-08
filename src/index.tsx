import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './common/components/App'
import GlobalStyle from './globalStyle'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './common/helpers/AuthContext'
import { StyledEngineProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from './core/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyle />
			<BrowserRouter>
				<AuthProvider>
					<StyledEngineProvider injectFirst>
						<App />
					</StyledEngineProvider>
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)
