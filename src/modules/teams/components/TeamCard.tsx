import { FC } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { device } from '../../../common/helpers/breakpoint'
import { ITeamCard } from '../interfaces/types'

export const TeamCard: FC<ITeamCard> = ({ team }) => {
	const navigate = useNavigate()

	return (
		<Card onClick={() => navigate(`/teams/${team._id}`)} key={team._id}>
			<ImageBlock>
				{team.teamImg ? (
					<Img
						src={`${process.env.REACT_APP_BASE_URL_IMAGE}${team.teamImg}`}
						alt={team.name}
					/>
				) : (
					<NoImg>Loading image...</NoImg>
				)}
			</ImageBlock>

			<TextBlock>
				<Name>{team.name}</Name>
				<Year>Year of foundation: {team.year}</Year>
			</TextBlock>
		</Card>
	)
}

const Card = styled.div`
	cursor: pointer;
	border-radius: 4px;
`
const ImageBlock = styled.div`
	width: 100%;
	height: 70%;
	display: flex;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.gradientCard};
	@media ${device.tablet} {
		height: 50%;
		background: ${({ theme }) => theme.colors.gradientCardTablet};
	}
`

const TextBlock = styled.div`
	width: 100%;
	height: 30%;
	display: flex;
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.darkGrey};
	@media ${device.tablet} {
		height: 50%;
	}
`
const Img = styled.img`
	width: 200px;
	height: 200px;
	@media ${device.desktop} {
		width: 150px;
		height: 150px;
	}
	@media ${device.tablet} {
		width: 60px;
		height: 60px;
	}
`

const Name = styled.div`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.white};

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-word;

	text-align: center;
	padding: 0 10px;

	@media ${device.desktop} {
		font-size: 18px;
	}
	@media ${device.tablet} {
		font-size: 15px;
	}
`

const Year = styled.div`
	margin-top: 7.5px;
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 16px;
	color: ${({ theme }) => theme.colors.lightGrey};
	@media ${device.desktop} {
		font-size: 14px;
	}
	@media ${device.tablet} {
		font-size: 13px;
	}
`

const NoImg = styled.div`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.white};
	@media ${device.desktop} {
		font-size: 18px;
	}
`
