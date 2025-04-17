const screenSize = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	customForTeamHeader: '510px',
	tablet: '768px',
	laptop: '1023px',
	laptopL: '1440px',
	desktop: '2560px',
}

export const device = {
	mobileS: `(max-width: ${screenSize.mobileS})`,
	mobileM: `(max-width: ${screenSize.mobileM})`,
	mobileL: `(max-width: ${screenSize.mobileL})`,
	customForTeamHeader: `(max-width: ${screenSize.customForTeamHeader})`,
	tablet: `(max-width: ${screenSize.tablet})`,
	laptop: `(max-width: ${screenSize.laptop})`,
	laptopL: `(max-width: ${screenSize.laptopL})`,
	desktop: `(max-width: ${screenSize.desktop})`,
}
