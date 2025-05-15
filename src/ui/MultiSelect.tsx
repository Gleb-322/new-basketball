import { FC } from 'react'
import Select, {
	components,
	ValueContainerProps,
	MultiValue,
	OnChangeValue,
} from 'react-select'
import { IMultiSelect, IOption } from '../common/interfaces/types'
import styled from 'styled-components'
import { device } from '../common/helpers/breakpoint'
import { ReactComponent as ClearSVG } from '../assets/icons/clear-multivalue.svg'

// Кастомный ValueContainer
const CustomValueContainer = (props: ValueContainerProps<IOption, true>) => {
	const { getValue, children, selectProps } = props
	const selected = getValue() || []
	const maxToShow = 1
	const displayValues = selected.slice(0, maxToShow)

	const extraValues =
		selected.length > maxToShow ? selected.length - maxToShow : 0

	const CustomTag = (option: IOption) => {
		const handleRemove = () => {
			const currentValues = getValue() as IOption[]

			const newValues = currentValues.filter(val => val.value !== option.value)

			if (selectProps.onChange) {
				selectProps.onChange(newValues as MultiValue<IOption>, {
					action: 'remove-value',
					removedValue: option,
				})
			}
		}

		return (
			<TagContainer key={option.value}>
				<DisplayValues>{option.value}</DisplayValues>
				<RemoveButtonWrapper>
					<RemoveButton
						type={'button'}
						onClick={handleRemove}
						onTouchEnd={e => {
							e.preventDefault()
							handleRemove()
						}}
					>
						<StyledClearSVG />
					</RemoveButton>
				</RemoveButtonWrapper>
			</TagContainer>
		)
	}
	return (
		<components.ValueContainer {...props}>
			{displayValues.map(val => CustomTag(val))}
			{extraValues > 0 && <ExtraValues>...</ExtraValues>}
			{Array.isArray(children) ? (
				<>
					{selected.length === 0 && children[0]}
					{children[1]}
				</>
			) : (
				children
			)}
		</components.ValueContainer>
	)
}

export const MultiSelectComponent: FC<IMultiSelect> = ({
	onMultiValue,
	options,
	isLoading,
}) => {
	const selectOnChange = (newValue: OnChangeValue<IOption, true>) =>
		onMultiValue(newValue)

	return (
		<StyledSelect
			components={{
				...components,
				ValueContainer: CustomValueContainer,
			}}
			placeholder="Select..."
			isClearable={true}
			isSearchable={false}
			isMulti
			options={options}
			menuPosition="fixed"
			onChange={selectOnChange}
			menuPlacement={'bottom'}
			classNamePrefix="react-multiselect"
			isLoading={isLoading}
			noOptionsMessage={() =>
				isLoading ? 'Loading teams...' : 'There are no teams'
			}
		/>
	)
}

const StyledSelect = styled(Select<IOption, true>)`
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
		margin-left: 24px;
		cursor: pointer;
		@media ${device.custom1190} {
			margin-left: 0px;
			margin-top: 16px;
		}
		@media ${device.custom510} {
			width: 100%;
		}
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

const TagContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.red};
	border-radius: 4px;
	height: 24px;
	padding: 0px 4px;
	margin: 0;
	max-width: 150px;
	position: relative;
`

const DisplayValues = styled.div`
	color: ${({ theme }) => theme.colors.white};
	font-family: 'Avenir Book';
	font-weight: 500;
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: calc(100% - 20px);
`

const RemoveButtonWrapper = styled.div`
	margin-left: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 24px;
	position: relative;
	z-index: 2;
`

const RemoveButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.white};
	background-color: inherit;
	outline: none;
	border: none;
	cursor: pointer;
	width: 100%;
	height: 100%;
	touch-action: manipulation;
`
const StyledClearSVG = styled(ClearSVG)`
	width: 16px;
	height: 16px;
	z-index: 2;
	pointer-events: none;
`
const ExtraValues = styled.div`
	border-radius: 4px;
	height: 24px;
	padding: 0px 4px;
	margin: 0px;
	margin-left: 4px;
	background-color: ${({ theme }) => theme.colors.red};
	color: ${({ theme }) => theme.colors.white};
	font-family: 'Avenir Book';
	font-weight: 500;
	font-size: 14px;
`
