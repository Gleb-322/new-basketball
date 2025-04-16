import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isNavbarOpen: true,
	windowSize: window.innerWidth,
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleNavbar: state => {
			state.isNavbarOpen = !state.isNavbarOpen
		},
		closeNavbar: state => {
			state.isNavbarOpen = false
		},
		setWindowSize: (state, action: PayloadAction<number>) => {
			state.windowSize = action.payload
			if (action.payload >= 1024) {
				state.isNavbarOpen = true
			} else {
				state.isNavbarOpen = false
			}
		},
	},
})

export const { toggleNavbar, closeNavbar, setWindowSize } = uiSlice.actions

export default uiSlice.reducer
