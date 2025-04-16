import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './common/components/App'
import GlobalStyle from './globalStyle'
import { BrowserRouter } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { StyledEngineProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { store, persistor } from './core/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalStyle />
				<BrowserRouter>
					<StyledEngineProvider injectFirst>
						<App />
					</StyledEngineProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
)
