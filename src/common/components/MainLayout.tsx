import { Outlet } from 'react-router'
import { Header } from './Header'
import { Navbar } from './Navbar'
import styled from 'styled-components'
import { FC } from 'react'

export const MainLayout: FC = () => {
	return (
		<div>
			<Header />
			<Main>
				<Navbar />
				<Outlet />
			</Main>
		</div>
	)
}

const Main = styled.main`
	display: flex;
`
