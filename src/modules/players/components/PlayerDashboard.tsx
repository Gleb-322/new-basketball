import { FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IPlayers } from '../interfaces/types'
import { PlayerHeader } from './PlayerHeader'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { useLocation } from 'react-router'
import { PlayerList } from './PlayerList'
import { PlayerEmptyList } from './PlayerEmptyList'
import { LoadingComponent } from '../../../ui/Loading'
import { NotificationComponent } from '../../../ui/Notification'
import { get } from '../../../api/baseRequest'
import { ITeams } from '../../teams/interfaces/types'
import { convertBufferToUrl } from '../helpers/converterBufferToUrl'

export const PlayerDashboard: FC = () => {
	const location = useLocation()
	const [players, setPlayers] = useState<IPlayers[]>([])
	const [teamsOption, setTeamsOption] = useState<IOption[]>([])
	const [isTeamOptions, setIsTeamOption] = useState<boolean>(false)
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [decodedAvatars, setDecodedAvatars] = useState<
		| {
				[key: string]: string
		  }
		| string
	>({})
	const [selectedOption, setSelectedOption] = useState<IOption>(
		paginateOptions[0]
	)
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageCount, setPageCount] = useState<number>(0)
	const [keyword, setKeyword] = useState<string>('')

	// check if we have teams or not
	useEffect(() => {
		get('/teams/get', undefined)
			.then(result => {
				console.log('get all teams', result)
				if (result.success) {
					if (result.message.teams) {
						const teamsCopy = JSON.parse(
							JSON.stringify(result.message.teams)
						) as ITeams[]
						const teamOptions = teamsCopy.map(team => ({
							value: team.name,
							label: team.name,
						}))
						setTeamsOption(teamOptions)
						setIsTeamOption(true)
					} else setIsTeamOption(false)
				}
				if (!result.success) {
					setNotification(`${result.message}`)
				}
			})
			.catch(error => {
				console.log('error get teams', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
			})
	}, [])

	useEffect(() => {
		setLoading(true)
		get(
			`/players/get?page=${currentPage + 1}&limit=${
				selectedOption.value
			}&keyword=${keyword}`,
			undefined
		)
			.then(result => {
				console.log('res get players', result)
				if (result.success) {
					setPageCount(
						Math.ceil(
							result.message.countPlayers / parseInt(selectedOption.value)
						)
					)
					setPlayers(result.message.players)
					const avatars = convertBufferToUrl(result.message.players)
					if (avatars) {
						setDecodedAvatars(avatars)
					}
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
	}, [currentPage, keyword, selectedOption.value])

	useEffect(() => {
		if (location.state?.createPlayer) {
			setNotification(
				`${location.state?.createPlayer} player successful created!`
			)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}

		if (location.state?.successDelete) {
			setNotification(`${location.state?.successDelete}`)
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
			<PlayerHeader
				search={keyword}
				teamsOption={teamsOption}
				isTeamOptions={isTeamOptions}
				onSearch={setKeyword}
			/>
			<Main $loading={loading}>
				{loading ? (
					<LoadingComponent />
				) : players.length > 0 ? (
					<PlayerList players={players} avatars={decodedAvatars} />
				) : (
					<PlayerEmptyList />
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
				{players.length > 0 ? (
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
