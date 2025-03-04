import { FC, SetStateAction, useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'
import { get } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { LoadingComponent } from '../../../ui/Loading'
import { IOption, paginateOptions } from '../../../common/interfaces/types'

export const TeamDashboard: FC = () => {
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [teams, setTeams] = useState<ITeams[]>([])
	const [decodedAvatars, setDecodedAvatars] = useState<{
		[key: string]: string
	}>({})
	const [selectedOption, setSelectedOption] = useState<IOption>(
		paginateOptions[0]
	)
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageCount, setPageCount] = useState<number>(0)
	const [keyword, setKeyword] = useState<string>('')

	const location = useLocation()

	useEffect(() => {
		setLoading(true)
		console.log('keyword', keyword)
		get(
			`/teams/get?page=${currentPage + 1}&limit=${
				selectedOption.value
			}&keyword=${keyword}`,
			undefined
		)
			.then(result => {
				console.log('get teams', result)
				if (result.success) {
					const teamsCopy = JSON.parse(
						JSON.stringify(result.message.teams)
					) as ITeams[]
					const avatars: { [key: string]: string } = {}
					teamsCopy.forEach((team: ITeams) => {
						if (team.teamImg && team.teamImg.data) {
							// Декодируем Buffer
							const byteArray = new Uint8Array(team.teamImg.data)
							// Создаём Blob
							const blob = new Blob([byteArray], { type: 'image/jpeg' })
							// Генерируем URL
							avatars[team._id] = URL.createObjectURL(blob)
						}
					})
					setPageCount(
						Math.ceil(result.message.countTeams / selectedOption.value)
					)
					setTeams(result.message.teams)
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
	}, [currentPage, selectedOption.value, keyword])

	useEffect(() => {
		if (location.state?.createTeam) {
			setNotification(`Team: ${location.state?.name} successful created!`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}

		if (location.state?.updateTeam) {
			setNotification(`Team: ${location.state?.updateTeam} successful updated!`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}

		if (location.state?.deleteTeam) {
			setNotification(`${location.state?.deleteTeam}`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}
	}, [location])

	const handlePageClick = (data: { selected: SetStateAction<number> }) => {
		console.log('pagination data', data)
		setCurrentPage(data.selected)
	}

	const closeNotification = () => setNotification(null)
	return (
		<>
			<TeamHeader search={keyword} onSearch={setKeyword} />
			<Main $loading={loading}>
				{loading ? (
					<LoadingComponent />
				) : teams.length > 0 ? (
					<TeamList teams={teams} avatars={decodedAvatars} />
				) : (
					<TeamEmptyList />
				)}

				{notification ? (
					<NotificationComponent
						error={
							location.state?.createTeam ||
							location.state?.updateTeam ||
							location.state?.deleteTeam
								? false
								: true
						}
						message={notification}
						close={closeNotification}
					/>
				) : null}
			</Main>
			<Footer>
				{teams.length > 0 ? (
					<>
						<PaginationComponent
							pageClick={handlePageClick}
							countPage={pageCount}
						/>
						<SelectComponent
							options={paginateOptions}
							selected={selectedOption}
							onSelect={setSelectedOption}
						/>
					</>
				) : null}
			</Footer>
		</>
	)
}

const Main = styled.div<{
	$loading: boolean
}>`
	width: 100%;
	display: ${({ $loading }) => ($loading ? 'flex' : 'grid')};
	justify-content: ${({ $loading }) => ($loading ? 'center' : 'none')};
	align-items: ${({ $loading }) => ($loading ? 'center' : 'none')};
	margin: 32px 0;
`

const Footer = styled.footer`
	width: 100%;
	height: 44px;
	padding: 2px 0;
	position: sticky;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: inherit;
	color: white;
`
