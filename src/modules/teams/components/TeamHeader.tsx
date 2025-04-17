import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { SearchComponent } from '../../../ui/Search'
import { ButtonComponent } from '../../../ui/Button'
import { FC } from 'react'
import { ITeamHeader } from '../interfaces/types'
import { device } from '../../../common/helpers/breakpoint'

export const TeamHeader: FC<ITeamHeader> = ({ search, onSearch }) => {
	const navigate = useNavigate()

	return (
		<Header>
			<SearchComponent
				type={'text'}
				id={'searchTeam'}
				name={'searchTeam'}
				onSearch={onSearch}
				search={search}
			/>

			<ButtonComponent
				type={'button'}
				text={'Add +'}
				variant={'addTeam'}
				onClick={() => navigate('/teams/add')}
			/>
		</Header>
	)
}

const Header = styled.header`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 32px;

	@media ${device.tablet} {
		margin-bottom: 16px;
	}

	@media ${device.customForTeamHeader} {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		gap: 16px;
	}
`
