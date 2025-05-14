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
			<ImageBlock>
				{player.playerImg ? (
					<Img
						src={`${process.env.REACT_APP_BASE_URL_IMAGE}${player.playerImg}`}
						alt={player.name}
					/>
				) : (
					<StyledNoImageSVG />
				)}
			</ImageBlock>
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
const ImageBlock = styled.div`
	width: 100%;
	height: 70%;
	display: flex;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
	justify-content: center;
	align-items: flex-end;
	background: ${({ theme }) => theme.colors.gradientCard};
	@media ${device.tablet} {
		height: 60%;
		background: ${({ theme }) => theme.colors.gradientCardTablet};
	}
`
const TextBlock = styled.div`
	width: 100%;
	height: 30%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media ${device.tablet} {
		height: 40%;
	}
`
const Img = styled.img`
	width: 320px;
	height: 260px;
	object-fit: contain;
	object-position: center center;
	@media ${device.desktop} {
		width: 270px;
		height: 210px;
	}
	@media ${device.tablet} {
		object-position: top center;
		width: 120px;
		height: 90px;
	}
`

const Name = styled.div`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.white};

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-word;

	text-align: center;
	padding: 0 10px;

	@media ${device.desktop} {
		font-size: 18px;
	}
	@media ${device.tablet} {
		font-size: 15px;
	}
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
	@media ${device.desktop} {
		font-size: 14px;
	}
	@media ${device.tablet} {
		margin-top: 4.5px;
		font-size: 13px;
	}
`
const StyledNoImageSVG = styled(NoImageSVG)`
	width: 320px;
	height: 260px;
	@media ${device.desktop} {
		width: 270px;
		height: 210px;
	}
	@media ${device.tablet} {
		width: 120px;
		height: 90px;
	}
`
