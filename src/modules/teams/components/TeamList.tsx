import { useNavigate } from 'react-router'
import styled from 'styled-components'
import teamLogo from '../../../assets/images/teamCardLogo.png'
import { ITeamList } from '../interfaces/types'
import { FC } from 'react'

export const TeamList: FC<ITeamList> = ({ teams }) => {
	const navigate = useNavigate()
	return (
		<Teams>
			{teams.map(team => (
				<Card onClick={() => navigate('/teams/detail')} key={team._id}>
					<Image>
						<Img src={teamLogo} alt="logo" />
					</Image>
					<TextBlock>
						<Name>{team.name}</Name>
						<Year>Year of foundation: {team.year}</Year>
					</TextBlock>
				</Card>
			))}
		</Teams>
	)
}

const Teams = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(365px, 1fr));
	grid-template-rows: repeat(2, minmax(380px, 0.5fr));
	grid-auto-rows: minmax(380px, 0.5fr);
	gap: 24px;
`

const Card = styled.div`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.darkGrey};
	border-radius: 4px;
`
const Image = styled.div`
	width: 100%;
	height: 70%;
	display: flex;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.gradientCard};
`

const TextBlock = styled.div`
	width: 100%;
	height: 30%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Img = styled.img`
	width: 150px;
	height: 150px;
`

const Name = styled.div`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 18px;
	color: ${({ theme }) => theme.colors.white};
`

const Year = styled.div`
	margin-top: 7.5px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.lightGrey};
`
