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
import { convertBufferToUrl } from '../helpers/converterBufferToUrl'

export const TeamDashboard: FC = () => {
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [teams, setTeams] = useState<ITeams[]>([])
	const [decodedAvatars, setDecodedAvatars] = useState<
		| string
		| {
				[key: string]: string
		  }
	>({})
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

		const params = new URLSearchParams()
		params.append('page', (currentPage + 1).toString())
		params.append('limit', selectedOption.value)
		params.append('keyword', keyword)

		// добавляем массив фильтров
		// const filters = selectedTeams.map(team => team._id) // массив id команд
		// filters.forEach(id => params.append('filters', id))

		get(`/teams/get?${params.toString()}`, undefined)
			.then(result => {
				console.log('get teams', result)
				if (result.success) {
					setPageCount(
						Math.ceil(
							result.message.countTeams / parseInt(selectedOption.value)
						)
					)
					setTeams(result.message.teams)
					const avatars = convertBufferToUrl(result.message.teams)
					if (avatars) {
						setDecodedAvatars(avatars)
					}
				}
				if (!result.success) {
					setNotification(`${result.message}`)
				}
			})
			.catch(error => {
				console.log('error', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
			})
			.finally(() => setLoading(false))
	}, [currentPage, selectedOption.value, keyword])

	useEffect(() => {
		if (location.state?.createTeam) {
			setNotification(`Team: ${location.state?.createTeam} successful created!`)
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

	const handlePageClick = (data: { selected: SetStateAction<number> }) =>
		setCurrentPage(data.selected)

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
							variant={'pagination'}
							options={paginateOptions}
							selected={selectedOption}
							onChange={setSelectedOption}
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
