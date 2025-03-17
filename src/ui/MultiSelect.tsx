import { FC } from 'react'
import Select, { components } from 'react-select'
import { IMultiSelect, IOption } from '../common/interfaces/types'
import styled from 'styled-components'

export const MultiSelectComponent: FC<IMultiSelect> = ({ options }) => {
	const t = [
		{
			label: 'Philadelphia seventy sixers',
			value: 'Philadelphia seventy sixers',
		},
		{
			label: 'Oklahoma city thunder',
			value: 'Oklahoma city thunder',
		},
		{
			label: 'Lakers',
			value: 'Lakers',
		},
		{
			label: 'Portland trail blazers',
			value: 'Portland trail blazers',
		},
	]
	// const CustomValueContainer = ({ children, ...props }: any) => {
	// 	const maxToShow = 2
	// 	const [values, input] = children

	// 	const selected = props.getValue()

	// 	return (
	// 		<components.ValueContainer {...props}>
	// 			{selected.slice(0, maxToShow).map((val: any) => (
	// 				<components.MultiValue key={val.value} data={val} {...props}>
	// 					{val.label}
	// 				</components.MultiValue>
	// 			))}

	// 			{selected.length > maxToShow && (
	// 				<div
	// 					style={{
	// 						marginLeft: 8,
	// 						fontSize: 14,
	// 						color: '#fff',
	// 						backgroundColor: '#D32F2F',
	// 						padding: '0 8px',
	// 						borderRadius: 4,
	// 						height: 24,
	// 						display: 'flex',
	// 						alignItems: 'center',
	// 					}}
	// 				>
	// 					+{selected.length - maxToShow} ещё
	// 				</div>
	// 			)}

	// 			{input}
	// 		</components.ValueContainer>
	// 	)
	// }

	return (
		<StyledSelect
			// components={{ ValueContainer: CustomValueContainer }}
			isClearable={true}
			isSearchable={false}
			isMulti
			options={t}
			// isOptionDisabled={() => t.length >= 2}
			// value={selected}
			// onChange={handleChangeSelect}
			menuPlacement={'bottom'}
			classNamePrefix="react-multiselect"
			// isLoading={isLoading}
			// noOptionsMessage={() =>
			// 	isLoading ? 'Loading options...' : 'No positions found'
			// }
		/>
	)
}

const StyledSelect = styled(Select)`
	.react-multiselect__control {
		background-color: ${({ theme }) => theme.colors.white};
		border: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
		color: ${({ theme }) => theme.colors.grey};
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		border-radius: 4px;
		height: 40px;
		width: 365px;
		cursor: pointer;
	}

	.react-multiselect__control:hover {
		border: ${({ theme }) =>
			`0.5px solid ${theme.colors.lightestGrey}`} !important;
	}

	.react-multiselect__option--is-focused {
		background-color: transparent !important;
	}

	.react-multiselect__menu {
		background-color: ${({ theme }) => theme.colors.white};
		box-shadow: none;
		overflow: hidden;
		margin-top: 3px;
		margin-bottom: 6px;
		border: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
	}

	.react-multiselect__option {
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		color: ${({ theme }) => theme.colors.lightGrey};
		cursor: pointer;
		border-bottom: ${({ theme }) => `0.5px solid ${theme.colors.lightestGrey}`};
		text-indent: 6px;
	}

	.react-multiselect__option:last-child {
		border-bottom: none;
	}

	.react-multiselect__option--is-selected {
		background-color: ${({ theme }) => theme.colors.darkRed} !important;
		color: ${({ theme }) => theme.colors.white} !important;
	}

	.react-multiselect__option:not(
			.react-multiselect__option--is-selected
		):hover {
		background-color: ${({ theme }) => theme.colors.lightestRed} !important;
		color: ${({ theme }) => theme.colors.white} !important;
	}

	.react-multiselect__multi-value {
		border-radius: 4px;
		height: 24px;
		padding: 0px 4px;
		margin: 0px;
		margin-right: 4px;
		background-color: ${({ theme }) => theme.colors.red};
		color: ${({ theme }) => theme.colors.white};
	}
	.react-multiselect__multi-value__label {
		color: ${({ theme }) => theme.colors.white};
		font-family: 'Avenir Book';
		font-weight: 500;
		font-size: 14px;
		padding: 0;
		border-radius: 0px;
		padding-right: 8px;
		/* Новые стили для обрезки текста с троеточием */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 142px;
	}

	.react-multiselect__multi-value__remove {
		padding: 0;
		width: 14px;
		& svg {
			width: 12px;
			height: 12px;
		}
	}

	.react-multiselect__multi-value__remove:hover {
		color: ${({ theme }) => theme.colors.white};
		background-color: ${({ theme }) => theme.colors.red};
	}

	/* .react-multiselect__multi-value__remove {
		width: 12px;
		height: 12px;
	} */

	.css-15lsz6c-indicatorContainer {
		color: ${({ theme }) => theme.colors.lightestGrey} !important;
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
		border-color: ${({ theme }) =>
			`0.5px solid ${theme.colors.mostLightGrey}`} !important;
	}

	.css-hlgwow {
		justify-content: flex-start !important;
		padding-left: 12px;
	}
	.css-qr46ko {
		padding-top: 0px;
		padding-bottom: 0px;
	}
`
