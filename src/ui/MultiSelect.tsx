import { FC } from 'react'
import Select from 'react-select'
import { IOption } from '../common/interfaces/types'

export const MultiSelectComponent: FC = () => {
	const option: IOption[] = [
		{ value: '6', label: '6' },
		{ value: '12', label: '12' },
		{ value: '24', label: '24' },
	]
	return <Select isMulti options={option} />
}
