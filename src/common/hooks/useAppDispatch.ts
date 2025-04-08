import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../core/redux/store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
