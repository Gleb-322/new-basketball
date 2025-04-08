import { useSelector } from 'react-redux'
import { RootState } from '../../core/redux/store'

export const useAppSelector = useSelector.withTypes<RootState>()
