import { FC } from 'react'
import Select, { SingleValue } from 'react-select'
import styled from 'styled-components'
import { IOption, ISelect } from '../common/interfaces/types'

export const SelectComponent: FC<ISelect> = ({
	options,
	onSelect,
	selected,
}) => {
	const handleChangeSelect = (newValue: SingleValue<IOption>) => {
		console.log(newValue)
		if (newValue) {
			onSelect(newValue)
		}
	}
	return (
		<StyledSelect
			classNamePrefix="react-select"
			value={selected}
			isSearchable={false}
			onChange={handleChangeSelect}
			menuPlacement="top"
			name="color"
			options={options}
		/>
	)
}

const StyledSelect = styled(Select<IOption>)`
	.react-select__control {
		background-color: ${({ theme }) => theme.colors.white};
		border: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
		color: ${({ theme }) => theme.colors.darkGrey};
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		border-radius: 4px;
		width: 88px;
		cursor: pointer;
	}

	.react-select__control:hover {
		border: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
	}

	.react-select__option--is-focused {
		background-color: transparent !important;
	}

	.react-select__menu {
		background-color: ${({ theme }) => theme.colors.white};
		box-shadow: none;
		overflow: hidden;
		border: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
	}

	.react-select__option {
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		color: ${({ theme }) => theme.colors.lightGrey};
		cursor: pointer;
		border-bottom: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
		text-indent: 6px;
	}

	.react-select__option:last-child {
		border-bottom: none;
	}

	.react-select__option--is-selected {
		background-color: ${({ theme }) => theme.colors.darkRed} !important;
		color: ${({ theme }) => theme.colors.white} !important;
	}

	.react-select__option:not(.react-select__option--is-selected):hover {
		background-color: ${({ theme }) => theme.colors.lightestRed} !important;
		color: ${({ theme }) => theme.colors.white} !important;
	}

	.css-15lsz6c-indicatorContainer {
		color: ${({ theme }) => theme.colors.lightestGrey} !important;
	}

	.css-hlgwow {
		justify-content: center !important;
	}

	.css-15lsz6c-indicatorContainer:hover {
		color: ${({ theme }) => theme.colors.lightestGrey} !important;
	}

	.css-1xc3v61-indicatorContainer {
		color: ${({ theme }) => theme.colors.lightestGrey} !important;
	}

	.css-1xc3v61-indicatorContainer:hover {
		color: ${({ theme }) => theme.colors.lightestGrey} !important;
	}

	.css-t3ipsp-control {
		box-shadow: none !important;
	}
	.css-t3ipsp-control:hover {
		border-color: ${({ theme }) => theme.colors.lightestGrey};
	}
`
