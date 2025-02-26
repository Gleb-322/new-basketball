import { createGlobalStyle } from 'styled-components'
import AvenirBlackTTF from './assets/fonts/Avenir-Black.ttf'
import AvenirBlackEOT from './assets/fonts/Avenir-Black.eot'
import AvenirBlackWOFF from './assets/fonts/Avenir-Black.woff'
import AvenirBlackWOOF2 from './assets/fonts/Avenir-Black.woff2'
import AvenirBookTTF from './assets/fonts/Avenir-Book.ttf'
import AvenirBookEOT from './assets/fonts/Avenir-Book.eot'
import AvenirBookWOOF from './assets/fonts/Avenir-Book.woff'
import AvenirBookWOOF2 from './assets/fonts/Avenir-Book.woff2'
import AvenirMediumTTF from './assets/fonts/Avenir-Medium.ttf'
import AvenirMediumEOT from './assets/fonts/Avenir-Medium.eot'
import AvenirMediumWOOF from './assets/fonts/Avenir-Medium.woff'
import AvenirMediumWOOF2 from './assets/fonts/Avenir-Medium.woff2'

const GlobalStyle = createGlobalStyle`

	@font-face {
	font-family: 'Avenir Black';
	src: local('Avenir-Black'),
		url(${AvenirBlackTTF}) format('truetype'),
		url(${AvenirBlackEOT}) format('opentype'),
		url(${AvenirBlackWOFF}) format('woff'),
		url(${AvenirBlackWOOF2}) format('woff2');
		font-display: swap;
	}

	@font-face {
		font-family: 'Avenir Book';
		src: local('Avenir-Book'),
			url(${AvenirBookTTF}) format('truetype'),
			url(${AvenirBookEOT}) format('opentype'),
			url(${AvenirBookWOOF}) format('woof'),
			url(${AvenirBookWOOF2}) format('woof2');
		font-display: swap;
	}

	@font-face {
		font-family: 'Avenir Medium';
		src: local('Avenir-Medium'),
			url(${AvenirMediumTTF}) format('truetype'),
			url(${AvenirMediumEOT}) format('opentype'),
			url(${AvenirMediumWOOF}) format('woof'),
			url(${AvenirMediumWOOF2}) format('woof2');
			font-display: swap;
	}

	#root {
		font-family: 'Avenir Black', 'Avenir Book', 'Avenir Medium';
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		/* position: relative; */
	}
`

export default GlobalStyle
