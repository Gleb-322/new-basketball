import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { SearchComponent } from '../../../ui/Search'
import { ButtonComponent } from '../../../ui/Button'
import { FC } from 'react'
import { IPlayerHeader } from '../interfaces/types'
import { MultiSelectComponent } from '../../../ui/MultiSelect'

export const PlayerHeader: FC<IPlayerHeader> = ({
	search,
	onSearch,
	teamOption,
	isOptionsLoading,
	teams,
}) => {
	const navigate = useNavigate()

	const navigateToAddPlayer = () =>
		navigate('/players/add', {
			state: {
				teamOption,
				isOptionsLoading,
				teams,
			},
		})
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
				<MultiSelectComponent />
			</FilterBlock>
			<ButtonComponent
				type={'button'}
				text={'Add +'}
				onClick={navigateToAddPlayer}
				variant={'addPlayer'}
				disabled={teamOption && teamOption.length > 0 ? true : false}
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
