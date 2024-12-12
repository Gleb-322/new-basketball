import { FC, useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'

import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'

export const TeamDashboard: FC = () => {
	const [teams, setTeams] = useState<ITeams[]>([])
	useEffect(() => {
		setTeams([
			// {
			// 	_id: '12345235213233',
			// 	name: 'Oklahoma city thunder',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '2',
			// 	name: 'Portland trail blazers',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '3',
			// 	name: 'Memphis Grizzlies',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '4',
			// 	name: 'Minnesota timberwolves',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '5',
			// 	name: 'Philadelphia seventy sixers',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '6',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '7',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '8',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '9',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '23423444',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '2342',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '45',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '45435345',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '4513123',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
			// {
			// 	_id: '452',
			// 	name: 'Denver Nuggets',
			// 	division: 'string',
			// 	conference: ' string',
			// 	year: 1999,
			// 	teamImg: 'string',
			// 	players: [],
			// },
		])
	}, [])
	return (
		<>
			<TeamHeader />
			<Main>
				{teams.length ? <TeamList teams={teams} /> : <TeamEmptyList />}
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

const Footer = styled.footer`
	width: 100%;
	height: 40px;
	position: sticky;
	bottom: 0;
	background-color: black;
	color: white;
`
