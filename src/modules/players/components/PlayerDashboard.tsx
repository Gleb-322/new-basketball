import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { ReactComponent as EmptySearchPlayerSVG } from '../../../assets/images/emptySearchPlayer.svg'
import playerLogo from '../../../assets/images/playerCardLogo.png'
import { IPlayers } from '../interfaces/types'
import { PlayerHeader } from './PlayerHeader'

export const PlayerDashboard = () => {
	const navigate = useNavigate()
	const [players, setPlayers] = useState<IPlayers[] | []>([])
	useEffect(() => {
		setPlayers([
			{
				_id: '1',
				name: 'Anatoly Melnik',
				position: 'string',
				team: 'BC "Tigina" Bendery',
				height: 175,
				weight: 75,
				birthday: 'string',
				number: 10,
				playerImg: 'string',
			},
			{
				_id: '2',
				name: 'DDHWIU ieudhiuhiweu',
				position: 'string',
				team: 'IHDIhieuhdi',
				height: 175,
				weight: 75,
				birthday: 'string',
				number: 10,
				playerImg: 'string',
			},
			{
				_id: '3',
				name: 'Sex',
				position: 'Top',
				team: 'Pornhub',
				height: 25,
				weight: 100,
				birthday: 'string',
				number: 69,
				playerImg: 'string',
			},
			// {
			// 	_id: '4',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '5',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '6',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '7',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '8',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '9',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '23423444',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '2342',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '45',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '45435345',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '4513123',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
			// {
			// 	_id: '452',
			// 	name: 'Jaylen Adams',
			// 	position: 'string',
			// 	team: 'Portland trail blazers',
			// 	height: 123,
			// 	weight: 124,
			// 	birthday: 'string',
			// 	number: 10,
			// 	playerImg: 'string',
			// },
		])
	}, [])
	return (
		<>
			<PlayerHeader />
			<Main>
				{players.length ? (
					<Players>
						{players.map(player => (
							<Card
								onClick={() => navigate('/players/detail')}
								key={player._id}
							>
								<Image>
									<Img src={playerLogo} alt="logo" />
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
				) : (
					<EmptyPlayers>
						<EmptyBlock>
							<StyledEmptySearchPlayerSVG />
							<EmptyText>Empty Here</EmptyText>
							<EmptyNote>Add new teams to continue</EmptyNote>
						</EmptyBlock>
					</EmptyPlayers>
				)}
			</Main>
			<Footer>Pagination select pag</Footer>
		</>
	)
}

const Main = styled.div`
	width: 100%;
	display: grid;
	margin: 32px 0;
`

const Players = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(365px, 1fr));
	grid-template-rows: repeat(2, minmax(380px, 0.5fr));
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

const EmptyPlayers = styled.div`
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

const Footer = styled.footer`
	width: 100%;
	height: 40px;
	position: sticky;
	bottom: 0;
	background-color: black;
	color: white;
`
