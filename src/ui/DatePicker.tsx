import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePickerComponent: FC = () => {
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	return (
		<DatePicker selected={startDate} onChange={date => setStartDate(date)} />
	)
}

// .react-datepicker__triangle {
//   display: none;
// }

// .react-datepicker__day.react-datepicker__day--keyboard-selected {
//   border: none;
//   border-radius: 7px;
//   background-color: var(--dark);
//   color: var(--white);
// }

// .react-datepicker__day.react-datepicker__day--keyboard-selected:hover {
//   border: none;
//   border-radius: 7px;
//   background-color: var(--dark);
//   color: var(--white);
// }

// .react-datepicker-popper .react-datepicker__navigation {
//   padding-top: 12px;
//   color: #000;
// }

// .react-datepicker {
//   box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.189);
//   border: none !important;
//   font-family: "Inter" !important;
// }

// .react-datepicker__header {
//   border-bottom: solid 5px var(--light) !important;
//   background: white !important;
// }

// .react-datepicker__current-month {
//   color: var(--dark) !important;
// }

// .react-datepicker__day.react-datepicker__day--today {
//   border-radius: 7px;
//   border: solid 2px var(--brand) !important;
//   background-color: white !important;
//   color: var(--dark) !important;
//   width: 30px;
//   height: 30px;
// }

// .react-datepicker__day.react-datepicker__day--selected {
//   border: none;
//   border-radius: 7px;
//   background-color: black;
//   color: white;
// }

// .react-datepicker__day--selected:hover,
// .react-datepicker__day--in-selecting-range:hover,
// .react-datepicker__day--in-range:hover,
// .react-datepicker__month-text--selected:hover,
// .react-datepicker__month-text--in-selecting-range:hover,
// .react-datepicker__month-text--in-range:hover,
// .react-datepicker__quarter-text--selected:hover,
// .react-datepicker__quarter-text--in-selecting-range:hover,
// .react-datepicker__quarter-text--in-range:hover,
// .react-datepicker__year-text--selected:hover,
// .react-datepicker__year-text--in-selecting-range:hover,
// .react-datepicker__year-text--in-range:hover {
//   border: none;
//   border-radius: 7px !important;
//   background-color: var(--brand) !important;
//   color: var(--dark) !important;
// }
