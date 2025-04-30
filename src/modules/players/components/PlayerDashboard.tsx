import { FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IPlayers } from '../interfaces/types'
import { PlayerHeader } from './PlayerHeader'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { PlayerList } from './PlayerList'
import { PlayerEmptyList } from './PlayerEmptyList'
import { LoadingComponent } from '../../../ui/Loading'
import { ITeams } from '../../teams/interfaces/types'

import { getTeams } from '../../../api/teams/teamsService'
import { getPlayers } from '../../../api/players/playerService'
import { showToast } from '../../../ui/ToastrNotification'
import { convertBufferToUrl } from '../../../common/helpers/converterBufferToUrlAndFile'

export const PlayerDashboard: FC = () => {
	// const [players, setPlayers] = useState<IPlayers[]>([])
	// const [teamsOption, setTeamsOption] = useState<IOption[]>([])
	// const [isTeamOptions, setIsTeamOption] = useState<boolean>(false)
	// const [loading, setLoading] = useState<boolean>(false)
	// const [decodedAvatars, setDecodedAvatars] = useState<{
	// 	[key: string]: string
	// }>({})
	// const [selectedOption, setSelectedOption] = useState<IOption>(
	// 	paginateOptions[0]
	// )
	// const [currentPage, setCurrentPage] = useState<number>(0)
	// const [pageCount, setPageCount] = useState<number>(0)
	// const [keyword, setKeyword] = useState<string>('')
	// const [teamsFilter, setTeamsFilter] = useState<readonly IOption[]>([])

	// // check if we have teams or not
	// useEffect(() => {
	// 	setLoading(true)
	// 	getTeams()
	// 		.then(result => {
	// 			console.log('get all teams', result)
	// 			if (result.success) {
	// 				if (result.message instanceof Object) {
	// 					const teamsCopy = JSON.parse(
	// 						JSON.stringify(result.message.teams)
	// 					) as ITeams[]
	// 					const teamOptions = teamsCopy.map(team => ({
	// 						value: team.name,
	// 						label: team.name,
	// 						teamId: team._id,
	// 					}))
	// 					setTeamsOption(teamOptions)
	// 					setIsTeamOption(true)
	// 				} else setIsTeamOption(false)
	// 			}
	// 			if (!result.success) {
	// 				if (typeof result.message === 'string') {
	// 					showToast({
	// 						type: 'error',
	// 						message: `${result.message}`,
	// 					})
	// 				}
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log('error get teams', error)
	// 		})
	// 		.finally(() => setLoading(false))
	// }, [])

	// // get all players
	// useEffect(() => {
	// 	setLoading(true)

	// 	const query = new URLSearchParams()
	// 	query.append('page', (currentPage + 1).toString())
	// 	query.append('limit', selectedOption.value)
	// 	query.append('keyword', keyword)

	// 	const filters = [...teamsFilter]
	// 		.filter(team => team.teamId)
	// 		.map(team => team.teamId)

	// 	filters.forEach(teamId => {
	// 		if (teamId) {
	// 			query.append('filters', teamId)
	// 		}
	// 	})

	// 	getPlayers(query)
	// 		.then(result => {
	// 			console.log('res get players', result)
	// 			if (result.success) {
	// 				if (result.message instanceof Object) {
	// 					setPageCount(
	// 						Math.ceil(
	// 							result.message.countPlayers / parseInt(selectedOption.value)
	// 						)
	// 					)
	// 					setPlayers(result.message.players)
	// 					// const avatars = convertBufferToUrl(result.message.players)
	// 					// if (avatars) {
	// 					// 	setDecodedAvatars(avatars)
	// 					// }
	// 				}
	// 			}
	// 			if (!result.success) {
	// 				if (typeof result.message === 'string') {
	// 					showToast({
	// 						type: 'error',
	// 						message: `${result.message}`,
	// 					})
	// 				}
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log('error', error)
	// 		})
	// 		.finally(() => setLoading(false))
	// }, [currentPage, keyword, selectedOption.value, teamsFilter])

	// const handlePageClick = (data: { selected: SetStateAction<number> }) =>
	// 	setCurrentPage(data.selected)

	return (
		<>
			{/* <PlayerHeader
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
			</Main>
			<Footer>
				{players.length > 0 ? (
					<>
						<PaginationComponent
							pageClick={handlePageClick}
							countPage={pageCount}
							forcePage={0}
						/>
						<SelectComponent
							variant={'pagination'}
							options={paginateOptions}
							selected={selectedOption}
							onChange={setSelectedOption}
						/>
					</>
				) : null}
			</Footer> */}
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
