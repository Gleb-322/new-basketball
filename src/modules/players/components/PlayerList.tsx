import { FC } from 'react'
import styled from 'styled-components'
import { IPlayerList } from '../interfaces/types'
import { useNavigate } from 'react-router'

export const PlayerList: FC<IPlayerList> = ({ players, avatars }) => {
	const navigate = useNavigate()
	return (
		<Players>
			{players.map(player => (
				<Card onClick={() => navigate('/players/detail')} key={player._id}>
					<Image>
						<Img src={'playerLogo'} alt="logo" />
					</Image>
					<TextBlock>
						<Name>
							{player.name} <Number>#{player.number}</Number>
						</Name>
						<Team>{player.team}</Team>
					</TextBlock>
				</Card>
			))}
		</Players>
	)
}

const Players = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(365px, 1fr));
	grid-template-rows: repeat(auto-fill, minmax(380px, 0.5fr));
	grid-auto-rows: minmax(380px, 0.5fr);
	gap: 24px;
`

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
