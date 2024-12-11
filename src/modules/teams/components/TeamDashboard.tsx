import { useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'
import { ReactComponent as EmptySearchTeamSVG } from '../../../assets/images/emptySearchTeam.svg'
import teamLogo from '../../../assets/images/teamCardLogo.png'
import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { useNavigate } from 'react-router'

export const TeamDashboard = () => {
	const navigate = useNavigate()
	const [teams, setTeams] = useState<ITeams[] | []>([])
	useEffect(() => {
		setTeams([
			{
				_id: '12345235213233',
				name: 'Oklahoma city thunder',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '2',
				name: 'Portland trail blazers',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '3',
				name: 'Memphis Grizzlies',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '4',
				name: 'Minnesota timberwolves',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '5',
				name: 'Philadelphia seventy sixers',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '6',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '7',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '8',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '9',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '23423444',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '2342',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '45',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '45435345',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '4513123',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
			{
				_id: '452',
				name: 'Denver Nuggets',
				division: 'string',
				conference: ' string',
				year: 1999,
				teamImg: 'string',
				players: [],
			},
		])
	}, [])
	return (
		<>
			<TeamHeader />
			<Main>
				{teams.length ? (
					<Teams>
						{teams.map(team => (
							<Card onClick={() => navigate('/teams/detail')} key={team._id}>
								<Image>
									<Img src={teamLogo} alt="logo" />
								</Image>
								<TextBlock>
									<Name>{team.name}</Name>
									<Year>Year of foundation: {team.year}</Year>
								</TextBlock>
							</Card>
						))}
					</Teams>
				) : (
					<EmptyTeams>
						<EmptyBlock>
							<StyledEmptySearchTeamSVG />
							<EmptyText>Empty Here</EmptyText>
							<EmptyNote>Add new teams to continue</EmptyNote>
						</EmptyBlock>
					</EmptyTeams>
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

const Teams = styled.div`
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
	align-items: center;
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
	width: 150px;
	height: 150px;
`

const Name = styled.div`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 18px;
	color: ${({ theme }) => theme.colors.white};
`

const Year = styled.div`
	margin-top: 7.5px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.lightGrey};
`

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

const Footer = styled.footer`
	width: 100%;
	height: 40px;
	position: sticky;
	bottom: 0;
	background-color: black;
	color: white;
`
