import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { SearchComponent } from '../../../ui/Search'
import { ButtonComponent } from '../../../ui/Button'

export const TeamHeader = () => {
	const navigate = useNavigate()

	const navigateToAddTeam = () => navigate('/teams/add')
	return (
		<Header>
			<SearchComponent type={'text'} id={'searchTeam'} name={'searchTeam'} />

			<ButtonComponent
				type={'button'}
				text={'Add +'}
				add={true}
				save={false}
				cancel={false}
				addTeamHandler={navigateToAddTeam}
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
