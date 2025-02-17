import { FC, useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'
import { get } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'

export const TeamDashboard: FC = () => {
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [teams, setTeams] = useState<ITeams[]>([])
	const [decodedAvatars, setDecodedAvatars] = useState<{
		[key: string]: string
	}>({})

	const location = useLocation()

	useEffect(() => {
		setLoading(true)
		get('/teams/get', undefined)
			.then(result => {
				console.log('get teams', result)
				if (result.success) {
					const teamsCopy = JSON.parse(JSON.stringify(result.message))
					const avatars: { [key: string]: string } = {}
					teamsCopy.forEach((team: ITeams) => {
						if (team.teamImg && team.teamImg.data) {
							const byteArray = new Uint8Array(team.teamImg.data) // Декодируем Buffer
							const blob = new Blob([byteArray], { type: 'image/jpeg' }) // Создаём Blob
							avatars[team._id] = URL.createObjectURL(blob) // Генерируем URL
						}
					})
					setTeams(result.message)
					setDecodedAvatars(avatars)
					setLoading(false)
				}
				if (!result.success) {
					setNotification(`${result.message}`)
					setLoading(false)
				}
			})
			.catch(error => {
				console.log('error', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
				setLoading(false)
			})
	}, [])

	useEffect(() => {
		if (location.state?.name) {
			setNotification(`${location.state?.name} team successful created!`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}
	}, [location])

	const closeNotification = () => setNotification(null)
	return (
		<>
			<TeamHeader />
			<Main>
				{loading ? (
					<div>Loading...</div>
				) : teams.length > 0 ? (
					<TeamList teams={teams} avatars={decodedAvatars} />
				) : (
					<TeamEmptyList />
				)}

				{notification ? (
					<NotificationComponent
						error={location.state?.name ? false : true}
						message={notification}
						close={closeNotification}
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
