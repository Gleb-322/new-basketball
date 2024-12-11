import styled from 'styled-components'
import { ReactComponent as SearchSVG } from '../../../assets/icons/search.svg'
import { useNavigate } from 'react-router'

export const TeamHeader = () => {
	const navigate = useNavigate()
	return (
		<Header>
			<SearchBar>
				<Search
					type="text"
					id="search"
					name="search"
					placeholder="Search..."
					autoComplete="off"
				/>
				<StyledSearchSVG />
			</SearchBar>
			<AddNewTeam onClick={() => navigate('/teams/add')} type="button">
				Add +
			</AddNewTeam>
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
const SearchBar = styled.div`
	position: relative;
`
const Search = styled.input`
	width: 365px;
	border-radius: 4px;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.grey};
	padding: 8px 30px 8px 12px;
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	border: solid 0.5px ${({ theme }) => theme.colors.lightestGrey};
	outline: none;
`
const StyledSearchSVG = styled(SearchSVG)`
	position: absolute;
	top: 12px;
	right: 12px;
`
const AddNewTeam = styled.button`
	cursor: pointer;
	width: 105px;
	padding: 8px 24px;
	background-color: ${({ theme }) => theme.colors.red};
	color: ${({ theme }) => theme.colors.white};
	font-family: 'Avenir Medium';
	font-size: 15px;
	line-height: 24px;
	font-weight: 500;
	border: none;
	border-radius: 4px;
	&:hover {
		background-color: ${({ theme }) => theme.colors.lightRed};
	}
	&:active {
		background-color: ${({ theme }) => theme.colors.darkRed};
	}
	&:disabled {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
		color: ${({ theme }) => theme.colors.lightestGrey};
		&:hover {
			background-color: ${({ theme }) => theme.colors.mostLightGrey};
		}
	}
`
