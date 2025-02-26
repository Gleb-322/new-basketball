import { FC, SetStateAction, useEffect, useState } from 'react'
import { IOption, ITeams } from '../interfaces/types'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'
import { get } from '../../../api/baseRequest'
import { NotificationComponent } from '../../../ui/Notification'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'

const paginateOptions: IOption[] = [
	{ value: 6, label: '6' },
	{ value: 12, label: '12' },
	{ value: 24, label: '24' },
]

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
					const teamsCopy = JSON.parse(JSON.stringify(result.message.teams))
					const avatars: { [key: string]: string } = {}
					teamsCopy.forEach((team: ITeams) => {
						if (team.teamImg && team.teamImg.data) {
							const byteArray = new Uint8Array(team.teamImg.data) // Декодируем Buffer
							const blob = new Blob([byteArray], { type: 'image/jpeg' }) // Создаём Blob
							avatars[team._id] = URL.createObjectURL(blob) // Генерируем URL
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
	}, [currentPage, selectedOption, keyword])

	useEffect(() => {
		if (location.state?.name) {
			setNotification(`${location.state?.name} team successful created!`)
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
					<Loading>Loading...</Loading>
				) : teams.length > 0 ? (
					<TeamList
						teams={teams}
						avatars={decodedAvatars}
						teamsLimit={selectedOption.value}
					/>
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
			<Footer>
				<PaginationComponent
					pageClick={handlePageClick}
					countPage={pageCount}
				/>
				<SelectComponent
					options={paginateOptions}
					selected={selectedOption}
					onSelect={setSelectedOption}
				/>
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
const Loading = styled.div`
	font-family: 'Avenir Book';
	font-size: 36px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.blue};
`
