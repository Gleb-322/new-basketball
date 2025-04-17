import { FC } from 'react'
import { ReactComponent as EmptySearchPlayerSVG } from '../../../assets/images/emptySearchPlayer.svg'
import styled from 'styled-components'

export const PlayerEmptyList: FC = () => {
	return (
		<EmptyPlayers>
			<EmptyBlock>
				<StyledEmptySearchPlayerSVG />
				<EmptyText>Empty Here</EmptyText>
				<EmptyNote>Add new players to continue</EmptyNote>
			</EmptyBlock>
		</EmptyPlayers>
	)
}

const EmptyPlayers = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const EmptyBlock = styled.div`
	width: 550px;
	height: 550px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 15px;
`
const StyledEmptySearchPlayerSVG = styled(EmptySearchPlayerSVG)`
	width: 320px;
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
