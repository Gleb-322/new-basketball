import { FC, SetStateAction, useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'
import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { LoadingComponent } from '../../../ui/Loading'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { convertBufferToUrl } from '../helpers/converterBufferToUrl'
import { getTeams } from '../../../api/teams/teamsService'
import { showToast } from '../../../ui/ToastrNotification'
import { device } from '../../../common/helpers/breakpoint'

export const TeamDashboard: FC = () => {
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

	// get all teams
	useEffect(() => {
		setLoading(true)

		const query = new URLSearchParams()
		query.append('page', (currentPage + 1).toString())
		query.append('limit', selectedOption.value)
		query.append('keyword', keyword)

		getTeams(query)
			.then(result => {
				console.log('get teams', result)
				if (result.success) {
					if (result.message instanceof Object) {
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
				}
				if (!result.success) {
					if (typeof result.message === 'string')
						showToast({
							type: 'error',
							message: `${result.message}`,
						})
				}
			})
			.catch(error => {
				console.log('error', error)
			})
			.finally(() => setLoading(false))
	}, [currentPage, selectedOption.value, keyword])

	const handlePageClick = (data: { selected: SetStateAction<number> }) =>
		setCurrentPage(data.selected)

	return (
		<>
			<TeamHeader search={keyword} onSearch={setKeyword} />
			<Main $loading={loading}>
				{loading ? (
					<LoadingComponent />
				) : teams.length === 0 ? (
					<TeamList teams={teams} avatars={decodedAvatars} />
				) : (
					<TeamEmptyList />
				)}
			</Main>
			<Footer>
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
			</Footer>
		</>
	)
}

const Main = styled.div<{
	$loading: boolean
}>`
	width: 100%;
	overflow: auto;
	display: flex;
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
	margin-top: 32px;
	@media ${device.tablet} {
		margin-top: 0px;
	}
	@media ${device.customForTeamHeader} {
		height: 32px;
	}
`
