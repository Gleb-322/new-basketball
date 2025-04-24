import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import { FC, useEffect } from 'react'
import { LinkComponent } from '../../../ui/Link'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { showToast } from '../../../ui/ToastrNotification'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { getTeamThunk, removeTeamThunk } from '../../../api/teams/teamThunks'
import { selectTeamById } from '../teamSlice'

dayjs.extend(utc)

export const TeamDetail: FC = () => {
	const { token } = useAppSelector((state: RootState) => state.user)
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const { teamsAvatars, playersAvatars, status, error, lastRemovedTeam } =
		useAppSelector((state: RootState) => state.team)

	const team = useAppSelector((state: RootState) =>
		params._id ? selectTeamById(state, params._id) : undefined
	)

	// get team by id
	useEffect(() => {
		if (params._id) {
			dispatch(getTeamThunk(params._id))
		}
	}, [dispatch, params._id])

	// show error
	useEffect(() => {
		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: error,
			})
		}
	}, [status, error])

	// delete team
	useEffect(() => {
		if (status === 'success' && lastRemovedTeam) {
			navigate('/teams')
			showToast({
				type: 'success',
				message: `${lastRemovedTeam}`,
			})
		}

		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: `${error}`,
			})
		}
	}, [status, error, navigate, lastRemovedTeam])

	return (
		<Container>
			<>
				{team && (
					<DetailBlock>
						<HeaderDetail>
							<HeaderText>
								<LinkComponent route={'/teams'} text={'Teams'} />{' '}
								<Slash>/</Slash> {team.name}
							</HeaderText>

							<div>
								<ButtonEdit
									type="button"
									onClick={() => navigate('/teams/add', { state: { team } })}
								>
									<EditSVG />
								</ButtonEdit>
								<ButtonDelete
									type="button"
									onClick={() =>
										dispatch(
											removeTeamThunk({
												teamId: params._id ?? undefined,
												token,
											})
										)
									}
								>
									<DeleteSVG />
								</ButtonDelete>
							</div>
						</HeaderDetail>

						<MainDetail>
							<Left>
								{teamsAvatars && teamsAvatars[team._id] ? (
									<Img src={teamsAvatars[team._id]} alt={team.name} />
								) : (
									<div>Loading image...</div>
								)}
							</Left>
							<Right>
								<Name>{team.name}</Name>
								<TextBlock>
									<TextColumn>
										<Key>Year of foundation</Key>
										<Value>{team.year}</Value>
									</TextColumn>
									<TextColumn>
										<Key>Division</Key>
										<Value>{team.division}</Value>
									</TextColumn>
									<TextColumn>
										<Key>Conference</Key>
										<Value>{team.conference}</Value>
									</TextColumn>
								</TextBlock>
							</Right>
						</MainDetail>
					</DetailBlock>
				)}

				<RosterBlock>
					<RoosterTitle>Roster</RoosterTitle>
					<RosterTable>
						<PlayerHeader>
							<PlayerHeaderLeft>
								<MarginRight>
									<PlayerNumber>#</PlayerNumber>
								</MarginRight>
								<div>Player</div>
							</PlayerHeaderLeft>
							<PlayerHeaderRight>
								<div>Height</div> <div>Weight</div> <div>Age</div>
							</PlayerHeaderRight>
						</PlayerHeader>

						{team && team.players.length ? (
							<>
								{team?.players.map(player => (
									<Player
										key={player._id}
										onClick={() => navigate(`/players/${player._id}`)}
									>
										<PlayerLeft>
											<MarginRight>
												<PlayerNumber>
													{player.number ? player.number : '-'}
												</PlayerNumber>
											</MarginRight>

											<PlayerInfo>
												{playersAvatars && playersAvatars[player._id] ? (
													<PlayerImg
														src={playersAvatars[player._id]}
														alt={player.name}
													/>
												) : (
													<NoImage />
												)}
												<PlayerNameAndPosition>
													<div>{player.name}</div>
													<PlayerPosition>{player.position}</PlayerPosition>
												</PlayerNameAndPosition>
											</PlayerInfo>
										</PlayerLeft>
										<PlayerRight>
											<div>{player.height} cm</div>
											<div>{player.weight} kg</div>
											<div>
												{dayjs.utc().diff(dayjs.utc(player.birthday), 'year')}
											</div>
										</PlayerRight>
									</Player>
								))}
							</>
						) : (
							<EmptyPlayers>Team has no players...</EmptyPlayers>
						)}
					</RosterTable>
				</RosterBlock>
			</>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
`

const DetailBlock = styled.div`
	border-radius: 10px;
	background-image: ${({ theme }) => theme.colors.gradientTeamDetail};
	width: 100%;
	height: 480px;
`

const HeaderDetail = styled.header`
	padding: 18px 24px;
	height: 15%;
	width: 100%;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
`
const HeaderText = styled.span`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.red};
`
const Slash = styled.span`
	color: ${({ theme }) => theme.colors.lightGrey};
`

const ButtonEdit = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	border: none;
`
const ButtonDelete = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.white};
	margin-left: 16px;
	border: none;
`

const MainDetail = styled.div`
	display: flex;
	height: 85%;
	width: 100%;
`

const Left = styled.div`
	width: 40%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Img = styled.img`
	width: 210px;
	height: 210px;
`

const Right = styled.div`
	width: 60%;
	padding: 65px 0;
`

const Name = styled.span`
	font-family: 'Avenir Black';
	font-size: 36px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
`
const TextBlock = styled.div`
	margin-top: 40px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-auto-rows: 1fr;
	row-gap: 54px;
`
const TextColumn = styled.div`
	display: flex;
	flex-direction: column;
`
const Key = styled.span`
	font-family: 'Avenir Black';
	font-size: 24px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
`

const Value = styled.span`
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
`

const RosterBlock = styled.div`
	margin-top: 24px;
	background: ${({ theme }) => theme.colors.white};
	border-radius: 10px;

	border: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
`

const RoosterTitle = styled.div`
	padding: 14px 32px;
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
`
const RosterTable = styled.div`
	width: 100%;
`

const PlayerHeader = styled.header`
	padding: 5px 32px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-top: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
`
const PlayerHeaderLeft = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
`

const MarginRight = styled.div`
	margin-right: 30px;
`

const PlayerHeaderRight = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Player = styled.div`
	cursor: pointer;
	padding: 5px 32px;
	display: flex;
	justify-content: space-between;
	border-top: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
	&:hover {
		background-color: ${({ theme }) => theme.colors.mostLightGrey};
	}
	&:last-child:hover {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
`
const PlayerLeft = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
`
const PlayerInfo = styled.div`
	display: flex;
`
const PlayerNameAndPosition = styled.div`
	display: flex;
	flex-direction: column;
`
const PlayerNumber = styled.div`
	width: 25px;
	display: flex;
	justify-content: start;
	align-items: center;
`
const PlayerImg = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 100%;
	margin-right: 16px;
`
const NoImage = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 100%;
	margin-right: 16px;
	background-color: ${({ theme }) => theme.colors.mostLightGrey};
`

const PlayerPosition = styled.div`
	font-family: 'Avenir Medium';
	font-size: 12px;
	font-weight: 500;
	line-height: 21px;
	color: ${({ theme }) => theme.colors.lightGrey};
`

const PlayerRight = styled.div`
	width: 30%;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const EmptyPlayers = styled.div`
	padding: 5px 32px;
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
`
