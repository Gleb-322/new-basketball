import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { ReactComponent as SearchSVG } from '../assets/icons/search.svg'
import { ISearch } from '../common/interfaces/types'
import { device } from '../common/helpers/breakpoint'

export const SearchComponent: FC<ISearch> = ({
	type,
	name,
	id,
	onSearch,
	search,
}) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			onSearch(e.target.value)
		} else {
			onSearch('')
		}
	}
	return (
		<Container>
			<SearchBar>
				<Search
					type={type}
					id={id}
					name={name}
					value={search}
					placeholder="Search..."
					autoComplete="off"
					onChange={handleOnChange}
				/>
				<StyledSearchSVG />
			</SearchBar>
		</Container>
	)
}

const Container = styled.div`
	width: 365px;
	@media ${device.customForTeamHeader} {
		width: 100%;
	}
`

const SearchBar = styled.div`
	position: relative;
`

const Search = styled.input`
	width: 100%;
	height: 40px;
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
