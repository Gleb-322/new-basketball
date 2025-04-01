import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import { ReactComponent as ChevronLeft } from '../assets/icons/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../assets/icons/chevron-right.svg'
import styled from 'styled-components'
import { IPagination } from '../common/interfaces/types'

export const PaginationComponent: FC<IPagination> = ({
	pageClick,
	countPage,
}) => {
	return (
		<StyledReactPaginate
			previousLabel={<ChevronLeft />}
			nextLabel={<ChevronRight />}
			breakLabel={'...'}
			disabledClassName="disabled"
			activeClassName="active"
			pageCount={countPage}
			pageRangeDisplayed={4}
			marginPagesDisplayed={1}
			onPageChange={pageClick}
		/>
	)
}

const StyledReactPaginate = styled(ReactPaginate)`
	width: 430px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	list-style: none;
	background-color: inherit;
	& li {
		width: 40px;
		height: 40px;
		border-radius: 4px;
		background-color: inherit;
		color: ${({ theme }) => theme.colors.grey};
		&.active {
			background-color: ${({ theme }) => theme.colors.red};
			color: ${({ theme }) => theme.colors.white};
		}
	}
	& a {
		width: 100%;
		height: 100%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
	}
`
