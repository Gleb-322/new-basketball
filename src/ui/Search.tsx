import { FC } from 'react'
import styled from 'styled-components'
import { ReactComponent as SearchSVG } from '../assets/icons/search.svg'
import { ISearch } from '../common/interfaces/types'

export const SearchComponent: FC<ISearch> = ({ type, name, id }) => {
	return (
		<SearchBar>
			<Search
				type={type}
				id={id}
				name={name}
				placeholder="Search..."
				autoComplete="off"
			/>
			<StyledSearchSVG />
		</SearchBar>
	)
}

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
