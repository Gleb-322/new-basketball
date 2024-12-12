import styled from 'styled-components'
import { ReactComponent as EmptySearchTeamSVG } from '../../../assets/images/emptySearchTeam.svg'

export const TeamEmptyList = () => {
	return (
		<EmptyTeams>
			<EmptyBlock>
				<StyledEmptySearchTeamSVG />
				<EmptyText>Empty Here</EmptyText>
				<EmptyNote>Add new teams to continue</EmptyNote>
			</EmptyBlock>
		</EmptyTeams>
	)
}

const EmptyTeams = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
`
const EmptyBlock = styled.div`
	align-self: center;
	justify-self: center;
	width: 550px;
	height: 550px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 15px;
`
const StyledEmptySearchTeamSVG = styled(EmptySearchTeamSVG)`
	width: 482px;
	height: 320px;
`
const EmptyText = styled.div`
	font-family: 'Avenir Black';
	font-weight: 900;
	font-size: 36px;
	color: ${({ theme }) => theme.colors.lightestRed};
`
const EmptyNote = styled.div`
	font-family: 'Avenir Book';
	font-weight: 500;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
