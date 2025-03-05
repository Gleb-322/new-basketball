import { FC } from 'react'
import Select, { SingleValue } from 'react-select'
import styled from 'styled-components'
import { IOption, ISelect } from '../common/interfaces/types'

export const SelectComponent: FC<ISelect> = ({
	options,
	onSelect,
	selected,
	variant,
	name,
	id,
	label,
	error,
}) => {
	const handleChangeSelect = (newValue: SingleValue<IOption>) => {
		if (newValue) {
			onSelect(newValue)
		}
	}
	return (
		<>
			{variant === 'playerPosition' ? (
				<Container>
					<Label htmlFor={id}>{label}</Label>
					<StyledSelect
						name={name}
						options={options}
						id={id}
						isClearable={true}
						isSearchable={false}
						value={selected}
						onChange={handleChangeSelect}
						menuPlacement={'bottom'}
						classNamePrefix="react-select"
						$variant={variant}
					/>
					{error && <InputError>{error}</InputError>}
				</Container>
			) : (
				<StyledSelect
					options={options}
					value={selected}
					isSearchable={false}
					onChange={handleChangeSelect}
					menuPlacement={'top'}
					classNamePrefix="react-select"
					$variant={variant}
				/>
			)}
		</>
	)
}

const Container = styled.div`
	height: 92px;
`

const Label = styled.label`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	cursor: pointer;
	color: ${({ theme }) => theme.colors.grey};
`

const StyledSelect = styled(Select<IOption>)<{
	$variant: 'pagination' | 'playerPosition'
}>`
	.react-select__control {
		background-color: ${({ theme, $variant }) =>
			$variant === 'playerPosition'
				? theme.colors.mostLightGrey
				: theme.colors.white};
		border: ${({ theme, $variant }) =>
			$variant === 'playerPosition'
				? `0.5px solid ${theme.colors.mostLightGrey}`
				: `0.5px solid ${theme.colors.lightestGrey}`};
		color: ${({ theme }) => theme.colors.darkGrey};
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		margin-top: ${({ $variant }) =>
			$variant === 'playerPosition' ? '8px' : '0px'};
		border-radius: 4px;
		height: 40px;
		width: ${({ $variant }) =>
			$variant === 'playerPosition' ? '100%' : '88px'};
		cursor: pointer;
	}

	.react-select__control:hover {
		border: ${({ theme, $variant }) =>
			$variant === 'playerPosition'
				? `0.5px solid ${theme.colors.mostLightGrey}`
				: `0.5px solid ${theme.colors.lightestGrey}`} !important;
	}

	.react-select__option--is-focused {
		background-color: transparent !important;
	}

	.react-select__menu {
		background-color: ${({ theme }) => theme.colors.white};
		box-shadow: none;
		overflow: hidden;
		margin-top: 3px;
		margin-bottom: 6px;
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
		justify-content: ${({ $variant }) =>
			$variant === 'playerPosition' ? 'flex-start' : 'center'} !important;
		padding-left: ${({ $variant }) =>
			$variant === 'playerPosition' ? '12px' : '0px'};
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
		border-color: ${({ theme, $variant }) =>
			$variant === 'playerPosition'
				? `0.5px solid ${theme.colors.mostLightGrey}`
				: `0.5px solid ${theme.colors.lightestGrey}`} !important;
	}

	.css-qr46ko {
		padding-top: 0px;
		padding-bottom: 0px;
	}
`
const InputError = styled.div`
	margin-top: 2px;
	margin-bottom: 4px;
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	color: ${({ theme }) => theme.colors.lightestRed};
`
