import { FC } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { IDatePicker } from '../common/interfaces/types'

export const DatePickerComponent: FC<IDatePicker> = ({
	name,
	id,
	label,
	value,
	onChange,
	error,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				<Label htmlFor={id}>{label}</Label>
				<StyledDatePicker
					format="DD-MM-YYYY"
					value={value}
					onChange={date => onChange(date ? dayjs(date) : null)}
					slotProps={{
						textField: {
							id,
							name,
							variant: 'outlined',
							fullWidth: true,
							inputProps: {
								readOnly: true,
							},
							placeholder: 'DD-MM-YYYY',
						},
					}}
				/>
				{error && <InputError>{error}</InputError>}
			</Container>
		</LocalizationProvider>
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
	color: ${({ theme }) => theme.colors.grey};
`
const StyledDatePicker = styled(DatePicker)`
	& .MuiOutlinedInput-root {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
		border-radius: 4px;
		border: none;
		outline: none;
		height: 40px;
		margin-top: 8px;
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		color: ${({ theme }) => theme.colors.darkGrey};
	}

	& .MuiOutlinedInput-input {
		padding: 0px 0px 0px 12px;
		box-sizing: border-box;
		font-family: 'Avenir Medium';
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
	}
	& .MuiInputAdornment-root {
		color: ${({ theme }) => theme.colors.mostLightGrey};
	}
	& .MuiSvgIcon-root {
		width: 16px;
		height: 16px;
	}

	& .MuiOutlinedInput-notchedOutline {
		border: none;
		outline: none;
	}

	.css-1n04w30-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
		.MuiOutlinedInput-notchedOutline {
		border: none;
		box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.focusInput};
	}

	.css-1n04w30-MuiInputBase-root-MuiOutlinedInput-root:hover
		.MuiOutlinedInput-notchedOutline {
		border: ${({ theme }) => `solid 1px ${theme.colors.mostLightGrey}`};
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
