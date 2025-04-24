import { Outlet } from 'react-router'
import { Header } from './Header'
import { Navbar } from './Navbar'
import styled from 'styled-components'
import { FC, useEffect } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { closeNavbar, setWindowSize } from '../../core/redux/uiSlice'
import { RootState } from '../../core/redux/store'

export const MainLayout: FC = () => {
	const dispatch = useAppDispatch()
	const { isNavbarOpen, windowSize } = useAppSelector(
		(state: RootState) => state.ui
	)

	// add handler to get current screen width
	useEffect(() => {
		const handleResize = () => dispatch(setWindowSize(window.innerWidth))

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [dispatch])

	// hidden scroll for active Navbar
	useEffect(() => {
		if (isNavbarOpen && windowSize < 1024) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isNavbarOpen, windowSize])

	return (
		<Conatiner>
			<Header />
			<Main>
				<Navbar />
				{isNavbarOpen && windowSize < 1024 ? (
					<Overlay onClick={() => dispatch(closeNavbar())} />
				) : null}

				<Content>
					<Outlet />
				</Content>
			</Main>
		</Conatiner>
	)
}

const Conatiner = styled.div`
	position: relative;
`

const Main = styled.main`
	display: flex;
	position: relative;
`
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.overlay};
	opacity: 0.6;
	z-index: 10;
`

const Content = styled.div`
	flex: 1;
`
