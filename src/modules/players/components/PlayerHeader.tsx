import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { SearchComponent } from '../../../ui/Search'
import { ButtonComponent } from '../../../ui/Button'
import { FC, useEffect } from 'react'
import { IPlayerHeader } from '../interfaces/types'
import { MultiSelectComponent } from '../../../ui/MultiSelect'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import { showToast } from '../../../ui/ToastrNotification'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { getMultiSelectOptionsThunk } from '../../../api/players/playerThunks'

export const PlayerHeader: FC<IPlayerHeader> = ({
	search,
	onSearch,
	onMultiValue,
}) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { teamOptions, status, error } = useAppSelector(
		(state: RootState) => state.player
	)
	const { isLoading } = useAppSelector((state: RootState) => state.loader)

	// get multi select options
	useEffect(() => {
		if (status !== 'loading') {
			dispatch(getMultiSelectOptionsThunk())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// show error
	useEffect(() => {
		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: error,
			})
		}
	}, [status, error])

	return (
		<Header>
			<FilterBlock>
				<SearchComponent
					type={'text'}
					id={'searchTeam'}
					name={'searchTeam'}
					onSearch={onSearch}
					search={search}
				/>
				<MultiSelectComponent
					onMultiValue={onMultiValue}
					options={teamOptions}
					isLoading={isLoading}
				/>
			</FilterBlock>
			<ButtonComponent
				type={'button'}
				text={'Add +'}
				onClick={() => navigate('/players/add')}
				variant={'addPlayer'}
				disabled={teamOptions && teamOptions.length > 0 ? true : false}
			/>
		</Header>
	)
}

const Header = styled.header`
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const FilterBlock = styled.div`
	display: flex;
`
