import styled from 'styled-components'
import { ReactComponent as Img404 } from '../../assets/images/notFound.svg'
import { FC } from 'react'

export const NotFound: FC = () => {
	return (
		<Section>
			<Block>
				<Img404 />
				<Text>Page not found</Text>
				<Note>Sorry, we can’t find what you’re looking for</Note>
			</Block>
		</Section>
	)
}

const Section = styled.section`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
`
const Block = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Text = styled.span`
	margin-top: 56px;
	font-family: 'Avenir Black';
	font-weight: 900;
	font-size: 36px;
	color: ${({ theme }) => theme.colors.lightestRed};
`
const Note = styled.span`
	margin-top: 24px;
	font-family: 'Avenir Book';
	font-weight: 500;
	font-size: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
