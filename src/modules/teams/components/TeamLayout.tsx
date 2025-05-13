import { FC } from 'react'
import { Outlet, useLocation } from 'react-router'
import styled from 'styled-components'
import { device } from '../../../common/helpers/breakpoint'

export const TeamLayout: FC = () => {
	const location = useLocation()

	return (
		<Section $path={location.pathname}>
			<Outlet />
		</Section>
	)
}

const Section = styled.section<{
	$path: string
}>`
	width: 100%;
	height: 100%;
	padding: 30px 80px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.mostLightGrey};
	@media ${device.laptop} {
		width: 100vw;
		min-height: calc(100vh - 80px);
		z-index: 5;
		padding: 30px 50px;
	}
	@media ${device.tablet} {
		padding: ${({ $path }) =>
			$path === '/teams' ? '16px 12px 0px 12px' : '16px 0px'};
		min-height: calc(100vh - 62px);
	}
`
