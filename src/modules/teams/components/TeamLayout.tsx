import { FC } from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'
import { device } from '../../../common/helpers/breakpoint'

export const TeamLayout: FC = () => {
	return (
		<Section>
			<Outlet />
		</Section>
	)
}

const Section = styled.section`
	width: 100%;
	height: 100%;
	padding: 30px 80px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.mostLightGrey};

	@media ${device.laptop} {
		width: 100vw;
		height: calc(100vh - 80px);
		z-index: 5;
	}
	@media ${device.tablet} {
		padding: 16px 12px 0px 12px;
		height: calc(100vh - 62px);
	}
`
