import { FC, useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'

import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'
import { get } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'

export const TeamDashboard: FC = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [teams, setTeams] = useState<ITeams[]>([])

	useEffect(() => {
		get('/teams/get', undefined)
			.then(result => {
				console.log('get teams', result)
				if (result.success) {
					setTeams(result.message)
				}
				if (!result.success) {
					setErrorMessage(`${result.message}`)
				}
			})
			.catch(error => {
				console.log('error', error)
				setErrorMessage(
					`Something going wrong... Error status: ${error.status}`
				)
			})
	}, [])

	const closeErrorMessage = (close: boolean) => setErrorMessage(null)
	return (
		<>
			<TeamHeader />
			<Main>
				{teams.length ? <TeamList teams={teams} /> : <TeamEmptyList />}
				{errorMessage ? (
					<NotificationComponent
						message={errorMessage}
						close={closeErrorMessage}
					/>
				) : null}
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
