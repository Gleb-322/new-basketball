import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { OnChangeValue } from 'react-select'
import { PlayerHeader } from './PlayerHeader'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { PlayerList } from './PlayerList'
import { PlayerEmptyList } from './PlayerEmptyList'
import { showToast } from '../../../ui/ToastrNotification'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import {
	selectAllPlayers,
	setCurrentPage,
	setKeyword,
	setSelectedOption,
	setTeamsFilter,
} from '../playerSlice'
import { getPlayersThunk } from '../../../api/players/playerThunks'
import { device } from '../../../common/helpers/breakpoint'

export const PlayerDashboard: FC = () => {
	const dispatch = useAppDispatch()
	const {
		status,
		error,
		keyword,
		pageCount,
		currentPage,
		selectedOption,
		teamsFilter,
	} = useAppSelector((state: RootState) => state.player)

	const players = useAppSelector(selectAllPlayers)

	// get all players
	useEffect(() => {
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

		if (status !== 'loading') {
			dispatch(getPlayersThunk(query))
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, dispatch, keyword, selectedOption.value, teamsFilter])

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

	// dispatch limit players per page and set first page in paginate component
	const handleLimitChange = (option: IOption) => {
		dispatch(setSelectedOption(option))
		dispatch(setCurrentPage(0))
	}
	// dispatch multi select value and set first page in paginate component
	const handleMultiSelect = (option: OnChangeValue<IOption, true>) => {
		console.log('handleMultiSelect', option)
		dispatch(setTeamsFilter(option))
		dispatch(setCurrentPage(0))
	}

	return (
		<>
			<PlayerHeader
				search={keyword}
				onSearch={handleSearch}
				onMultiValue={handleMultiSelect}
			/>
			<Main>
				{players.length > 0 ? (
					<PlayerList players={players} />
				) : (
					<PlayerEmptyList />
				)}
			</Main>
			<Footer>
				{pageCount > 0 ? (
					<PaginationComponent
						pageClick={page => dispatch(setCurrentPage(page.selected))}
						countPage={pageCount}
						forcePage={currentPage}
					/>
				) : (
					<div></div>
				)}
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
	color: ${({ theme }) => theme.colors.white};
	margin-top: 32px;
	@media ${device.tablet} {
		margin-top: 0px;
	}
	@media ${device.custom510} {
		height: 32px;
	}
`
