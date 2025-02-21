import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { ITeamList } from '../interfaces/types'
import { FC } from 'react'

export const TeamList: FC<ITeamList> = ({ teams, avatars, teamsLimit }) => {
	const navigate = useNavigate()

	return (
		<Teams $limit={teamsLimit}>
			{teams.map(team => (
				<Card onClick={() => navigate('/teams/detail')} key={team._id}>
					<Image>
						{avatars[team._id] ? (
							<Img src={avatars[team._id]} alt={team.name} />
						) : (
							<div>Loading image...</div>
						)}
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

const Teams = styled.div<{
	$limit: number
}>`
	width: 100%;
	display: grid;
	grid-template-columns: ${({ $limit }) =>
		$limit === 6
			? `repeat(auto-fill, minmax(365px, 1fr))`
			: $limit === 12
			? `repeat(auto-fill, minmax(200px, 1fr))`
			: `repeat(auto-fill, minmax(50px, 1fr))`};
	/* grid-template-columns: repeat(auto-fill, minmax(365px, 1fr)); */
	grid-template-rows: ${({ $limit }) =>
		$limit === 6
			? 'repeat(auto-fill, minmax(380px, 0.5fr))'
			: $limit
			? 'repeat(auto-fill, minmax(200px, 0.5fr))'
			: 'repeat(auto-fill, minmax(50px, 0.5fr))'};
	/* grid-template-rows: repeat(auto-fill, minmax(380px, 0.5fr)); */
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
