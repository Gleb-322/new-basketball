import { FC } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../common/hooks/useAppSelector'

export const LoaderComponent: FC = () => {
	const { isLoading } = useAppSelector(state => state.loader)
	return (
		<>
			{isLoading ? (
				<Overlay>
					<Spinner></Spinner>
				</Overlay>
			) : null}
		</>
	)
}

const Overlay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.overlay};
	opacity: 0.6;
	z-index: 1000;
`
const Spinner = styled.div`
	border: 4px solid ${({ theme }) => theme.colors.white};
	border-top: 4px solid ${({ theme }) => theme.colors.red};
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
