import { FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IDashPlayerLocationState, IPlayers } from '../interfaces/types'
import { PlayerHeader } from './PlayerHeader'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { useLocation } from 'react-router'
import { PlayerList } from './PlayerList'
import { PlayerEmptyList } from './PlayerEmptyList'
import { LoadingComponent } from '../../../ui/Loading'
import { NotificationComponent } from '../../../ui/Notification'
import { ITeams } from '../../teams/interfaces/types'
import { convertBufferToUrl } from '../helpers/converterBufferToUrl'
import { getTeams } from '../../../api/teams/teamsService'
import { getPlayers } from '../../../api/players/playerService'

export const PlayerDashboard: FC = () => {
	const location = useLocation() as unknown as Location &
		IDashPlayerLocationState
	const [players, setPlayers] = useState<IPlayers[]>([])
	const [teamsOption, setTeamsOption] = useState<IOption[]>([])
	const [isTeamOptions, setIsTeamOption] = useState<boolean>(false)
	const [notification, setNotification] = useState<string | undefined>(
		undefined
	)
	const [loading, setLoading] = useState<boolean>(false)
	const [decodedAvatars, setDecodedAvatars] = useState<{
		[key: string]: string
	}>({})
	const [selectedOption, setSelectedOption] = useState<IOption>(
		paginateOptions[0]
	)
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageCount, setPageCount] = useState<number>(0)
	const [keyword, setKeyword] = useState<string>('')
	const [teamsFilter, setTeamsFilter] = useState<readonly IOption[]>([])

	// check if we have teams or not
	useEffect(() => {
		setLoading(true)
		getTeams()
			.then(result => {
				console.log('get all teams', result)
				if (result.success) {
					if (result.message instanceof Object) {
						const teamsCopy = JSON.parse(
							JSON.stringify(result.message.teams)
						) as ITeams[]
						const teamOptions = teamsCopy.map(team => ({
							value: team.name,
							label: team.name,
							teamId: team._id,
						}))
						setTeamsOption(teamOptions)
						setIsTeamOption(true)
					} else setIsTeamOption(false)
				}
				if (!result.success) {
					if (typeof result.message === 'string') {
						setNotification(`${result.message}`)
					}
				}
			})
			.catch(error => {
				console.log('error get teams', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
			})
			.finally(() => setLoading(false))
	}, [])

	// get all players
	useEffect(() => {
		setLoading(true)

		const query = new URLSearchParams()
		query.append('page', (currentPage + 1).toString())
		query.append('limit', selectedOption.value)
		query.append('keyword', keyword)

		const filters = [...teamsFilter]
			.filter(team => team.teamId)
			.map(team => team.teamId)

		filters.forEach(teamId => {
			if (teamId) {
				query.append('filters', teamId)
			}
		})

		getPlayers(query)
			.then(result => {
				console.log('res get players', result)
				if (result.success) {
					if (result.message instanceof Object) {
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
					}
				}
				if (!result.success) {
					if (typeof result.message === 'string') {
						setNotification(`${result.message}`)
					}
				}
			})
			.catch(error => {
				console.log('error', error)
				setNotification(
					`Something going wrong... Error status: ${error.status}`
				)
			})
			.finally(() => setLoading(false))
	}, [currentPage, keyword, selectedOption.value, teamsFilter])

	useEffect(() => {
		if (location.state) {
			const { createPlayer, updatePlayer, deletePlayer } = location.state
			if (createPlayer || updatePlayer || deletePlayer) {
				const message = createPlayer
					? `Player with name: ${createPlayer} successful created!`
					: updatePlayer
					? `Player with name: ${location.state?.updatePlayer} successful updated!`
					: deletePlayer
				setNotification(message)
				const timer = setTimeout(() => {
					closeNotification()
				}, 6000)

				return () => clearTimeout(timer)
			}
		}
	}, [location])

	const handlePageClick = (data: { selected: SetStateAction<number> }) =>
		setCurrentPage(data.selected)

	const closeNotification = () => setNotification(undefined)
	return (
		<>
			<PlayerHeader
				search={keyword}
				onSearch={setKeyword}
				isTeamOptions={isTeamOptions}
				teamsOption={teamsOption}
				isLoading={loading}
				onMultiValue={setTeamsFilter}
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
						error={
							location.state?.createPlayer ||
							location.state?.updatePlayer ||
							location.state?.deletePlayer
								? false
								: true
						}
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
