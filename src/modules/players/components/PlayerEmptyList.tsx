import { FC } from 'react'
import { ReactComponent as EmptySearchPlayerSVG } from '../../../assets/images/emptySearchPlayer.svg'
import styled from 'styled-components'
import { device } from '../../../common/helpers/breakpoint'

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
	@media ${device.laptop} {
		height: 450px;
	}
	@media ${device.tablet} {
		height: 434px;
		width: 100%;
		border-radius: 0px;
	}
`
const StyledEmptySearchPlayerSVG = styled(EmptySearchPlayerSVG)`
	width: 320px;
	height: 320px;
	@media ${device.tablet} {
		/* width: 340px;
		height: 225px; */
	}
`
const EmptyText = styled.div`
	font-family: 'Avenir Black';
	font-weight: 900;
	font-size: 36px;
	color: ${({ theme }) => theme.colors.lightestRed};
	@media ${device.laptop} {
		font-size: 33px;
	}
	@media ${device.tablet} {
		font-size: 17px;
	}
`
const EmptyNote = styled.div`
	font-family: 'Avenir Book';
	font-weight: 500;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.grey};
	@media ${device.tablet} {
		font-size: 15px;
	}
`
