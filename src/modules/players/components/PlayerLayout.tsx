import { Outlet } from 'react-router'
import styled from 'styled-components'

export const PlayerLayout = () => {
	return (
		<Section>
			<Outlet />
		</Section>
	)
}

const Section = styled.section`
	width: 100%;
	padding: 30px 80px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.mostLightGrey};
`
