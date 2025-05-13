const screenSize = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	custom510: '510px',
	custom620: '620px',
	tablet: '768px',
	laptop: '1023px',
	custom1140: '1140px',
	custom1190: '1190px',
	laptopL: '1440px',
	desktop: '2560px',
}

export const device = {
	mobileS: `(max-width: ${screenSize.mobileS})`,
	mobileM: `(max-width: ${screenSize.mobileM})`,
	mobileL: `(max-width: ${screenSize.mobileL})`,
	custom510: `(max-width: ${screenSize.custom510})`,
	custom620: `(max-width: ${screenSize.custom620})`,
	custom1140: `(max-width: ${screenSize.custom1140})`,
	custom1190: `(max-width: ${screenSize.custom1190})`,
	tablet: `(max-width: ${screenSize.tablet})`,
	laptop: `(max-width: ${screenSize.laptop})`,
	laptopL: `(max-width: ${screenSize.laptopL})`,
	desktop: `(max-width: ${screenSize.desktop})`,
}
