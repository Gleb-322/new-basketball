import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { TeamHeader } from './TeamHeader'
import { TeamList } from './TeamList'
import { TeamEmptyList } from './TeamEmptyList'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { showToast } from '../../../ui/ToastrNotification'
import { device } from '../../../common/helpers/breakpoint'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import {
	selectAllTeams,
	setCurrentPage,
	setKeyword,
	setSelectedOption,
} from '../teamSlice'
import { getTeamsThunk } from '../../../api/teams/teamThunks'

export const TeamDashboard: FC = () => {
	const dispatch = useAppDispatch()
	const {
		teamsAvatars,
		status,
		error,
		keyword,
		pageCount,
		currentPage,
		selectedOption,
	} = useAppSelector((state: RootState) => state.team)

	const teams = useAppSelector(selectAllTeams)

	// get all teams
	useEffect(() => {
		const query = new URLSearchParams()
		query.append('page', (currentPage + 1).toString())
		query.append('limit', selectedOption.value)
		query.append('keyword', keyword)

		if (status !== 'loading') {
			dispatch(getTeamsThunk(query))
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, dispatch, keyword, selectedOption.value])

	// show error
	useEffect(() => {
		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: error,
			})
		}
	}, [status, error])

	// dispatch filter keyword and set first page in paginate component
	const handleSearch = (value: string) => {
		dispatch(setKeyword(value))
		dispatch(setCurrentPage(0))
	}

	// dispatch limit teams per page and set first page in paginate component
	const handleLimitChange = (option: IOption) => {
		dispatch(setSelectedOption(option))
		dispatch(setCurrentPage(0))
	}

	return (
		<>
			<TeamHeader search={keyword} onSearch={handleSearch} />
			<Main>
				{teams.length > 0 ? (
					<TeamList teams={teams} avatars={teamsAvatars} />
				) : (
					<TeamEmptyList />
				)}
			</Main>
			<Footer>
				<PaginationComponent
					pageClick={page => dispatch(setCurrentPage(page.selected))}
					countPage={pageCount}
					forcePage={currentPage}
				/>

				<SelectComponent
					variant={'pagination'}
					options={paginateOptions}
					selected={selectedOption}
					onChange={handleLimitChange}
				/>
			</Footer>
		</>
	)
}

const Main = styled.div`
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
