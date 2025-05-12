import { FC } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { device } from '../../../common/helpers/breakpoint'
import { ReactComponent as NoImageSVG } from '../../../assets/images/noImage.svg'
import { IPlayerCard } from '../interfaces/types'

export const PlayerCard: FC<IPlayerCard> = ({ player }) => {
	const navigate = useNavigate()

	return (
		<Card onClick={() => navigate(`/players/${player._id}`)} key={player._id}>
			<Image>
				{player.playerImg ? (
					<Img
						src={`${process.env.REACT_APP_BASE_URL_IMAGE}${player.playerImg}`}
						alt={player.name}
					/>
				) : (
					<StyledNoImageSVG />
				)}
			</Image>
			<TextBlock>
				<Name>
					{player.name} <Number>#{player?.number}</Number>
				</Name>
				<Team>{player.team.name}</Team>
			</TextBlock>
		</Card>
	)
}

const Card = styled.div`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.darkGrey};
	border-radius: 4px;
`
const Image = styled.div`
	width: 100%;
	height: 70%;
	display: flex;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
	justify-content: center;
	align-items: flex-end;
	background: ${({ theme }) => theme.colors.gradientCard};
`
const TextBlock = styled.div`
	width: 100%;
	height: 30%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Img = styled.img`
	width: 270px;
	height: 210px;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
`

const Name = styled.div`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 18px;
	color: ${({ theme }) => theme.colors.white};
`

const Number = styled.span`
	color: ${({ theme }) => theme.colors.lightRed};
`

const Team = styled.div`
	margin-top: 7.5px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.lightGrey};
`
const StyledNoImageSVG = styled(NoImageSVG)`
	width: 270px;
	height: 210px;
`
