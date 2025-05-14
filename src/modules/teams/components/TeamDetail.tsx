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
import { resetTeamState, selectTeamById } from '../teamSlice'
import { device } from '../../../common/helpers/breakpoint'

dayjs.extend(utc)

export const TeamDetail: FC = () => {
	const { token } = useAppSelector((state: RootState) => state.user)
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const { status, error, lastRemovedTeam } = useAppSelector(
		(state: RootState) => state.team
	)

	const team = useAppSelector((state: RootState) =>
		params._id ? selectTeamById(state, params._id) : undefined
	)

	// get team by id
	useEffect(() => {
		if (params._id) {
			dispatch(getTeamThunk(params._id))
		}
	}, [dispatch, params._id])

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

		return () => {
			dispatch(resetTeamState())
		}
	}, [status, error, navigate, lastRemovedTeam, dispatch])

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

							<HeaderBtns>
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
							</HeaderBtns>
						</HeaderDetail>

						<MainDetail>
							<Left>
								{team.teamImg ? (
									<Img
										src={`${process.env.REACT_APP_BASE_URL_IMAGE}${team.teamImg}`}
										alt={team.name}
									/>
								) : (
									<div>Loading image...</div>
								)}
							</Left>
							<Right>
								<Name>{team.name}</Name>
								<TextBlock>
									<TextColumnYear>
										<Key>Year of foundation</Key>
										<Value>{team.year}</Value>
									</TextColumnYear>
									<TextColumnDivision>
										<Key>Division</Key>
										<Value>{team.division}</Value>
									</TextColumnDivision>
									<TextColumnConference>
										<Key>Conference</Key>
										<Value>{team.conference}</Value>
									</TextColumnConference>
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
								<PlayerHeaderRightHeight>Height</PlayerHeaderRightHeight>{' '}
								<PlayerHeaderRightWeight>Weight</PlayerHeaderRightWeight>{' '}
								<PlayerHeaderRightAge>Age</PlayerHeaderRightAge>
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
												{player.playerImg ? (
													<PlayerImg
														src={`${process.env.REACT_APP_BASE_URL_IMAGE}${player.playerImg}`}
														alt={player.name}
													/>
												) : (
													<NoImage />
												)}
												<PlayerNameAndPosition>
													<PlayerName>{player.name}</PlayerName>
													<PlayerPosition>{player.position}</PlayerPosition>
												</PlayerNameAndPosition>
											</PlayerInfo>
										</PlayerLeft>
										<PlayerRight>
											<PlayerRightHeight>{player.height} cm</PlayerRightHeight>
											<PlayerRightWeight>{player.weight} kg</PlayerRightWeight>
											<PlayerRightbBirthday>
												{dayjs.utc().diff(dayjs.utc(player.birthday), 'year')}
											</PlayerRightbBirthday>
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
	background: ${({ theme }) => theme.colors.gradientTeamDetail};
	width: 100%;
	@media ${device.tablet} {
		border-radius: 0px;
		background: ${({ theme }) => theme.colors.gradientTeamDetailTablet};
	}
`

const HeaderDetail = styled.header`
	padding: 18px 24px;
	height: 64px;
	width: 100%;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	border: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	@media ${device.tablet} {
		border-top-right-radius: 0px;
		border-top-left-radius: 0px;
		border-left: none;
		border-right: none;
		padding: 16px;
	}
`
const HeaderText = styled.span`
	font-family: 'Avenir Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.red};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: calc(100% - 90px);
	@media ${device.tablet} {
		font-size: 13px;
		line-height: 18px;
		max-width: calc(100% - 70px);
	}
`
const Slash = styled.span`
	color: ${({ theme }) => theme.colors.lightGrey};
`

const HeaderBtns = styled.div`
	display: flex;
	min-width: 70px;
	justify-content: flex-end;
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
	align-items: center;
	width: 100%;
	@media ${device.tablet} {
		flex-direction: column;
	}
`

const Left = styled.div`
	width: 40%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media ${device.laptop} {
		width: 35%;
	}
	@media ${device.tablet} {
		margin-top: 48px;
		width: 100%;
	}
`
const Img = styled.img`
	width: 210px;
	height: 210px;
	object-fit: cover;
	object-position: center center;
	@media ${device.tablet} {
		width: 90px;
		height: 90px;
	}
`

const Right = styled.div`
	width: 60%;
	padding: 65px 0;
	@media ${device.laptop} {
		width: 65%;
	}
	@media ${device.tablet} {
		padding: 48px 0;
		width: 100%;
	}
`

const Name = styled.span`
	font-family: 'Avenir Black';
	font-size: 36px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
	@media ${device.tablet} {
		display: block;
		text-align: center;
		font-size: 17px;
		line-height: 25px;
	}
`
const TextBlock = styled.div`
	margin-top: 40px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-auto-rows: 1fr;
	row-gap: 54px;
	@media ${device.tablet} {
		margin-top: 48px;
		grid-template-columns: 1fr;
		justify-items: center;
		row-gap: 32px;
	}
`
const TextColumnConference = styled.div`
	display: flex;
	flex-direction: column;
	@media ${device.tablet} {
		order: 2;
		align-items: center;
	}
`
const TextColumnYear = styled.div`
	display: flex;
	flex-direction: column;
	@media ${device.tablet} {
		order: 1;
		align-items: center;
	}
`
const TextColumnDivision = styled.div`
	display: flex;
	flex-direction: column;
	@media ${device.tablet} {
		order: 3;
		align-items: center;
	}
`
const Key = styled.span`
	font-family: 'Avenir Black';
	font-size: 24px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
	@media ${device.tablet} {
		font-size: 17px;
		line-height: 25px;
	}
`

const Value = styled.span`
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.white};
	@media ${device.tablet} {
		font-size: 15px;
		line-height: 24px;
	}
`

const RosterBlock = styled.div`
	margin-top: 24px;
	background: ${({ theme }) => theme.colors.white};
	border-radius: 10px;
	border: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	@media ${device.tablet} {
		border-radius: 0px;
		border-left: none;
		border-right: none;
	}
`

const RoosterTitle = styled.div`
	padding: 14px 32px;
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
	@media ${device.tablet} {
		padding: 16px;
		font-size: 15px;
		line-height: 24px;
	}
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
	@media ${device.tablet} {
		padding: 5px 16px;
	}
`
const PlayerHeaderLeft = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
	@media ${device.tablet} {
		width: 100%;
	}
`

const MarginRight = styled.div`
	margin-right: 30px;
	@media ${device.tablet} {
		margin-right: 20px;
	}
`

const PlayerHeaderRight = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media ${device.tablet} {
		width: 0%;
	}
`
const PlayerHeaderRightHeight = styled.div`
	@media ${device.tablet} {
		display: none;
	}
`
const PlayerHeaderRightWeight = styled.div`
	@media ${device.tablet} {
		display: none;
	}
`
const PlayerHeaderRightAge = styled.div`
	@media ${device.tablet} {
		display: none;
	}
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
	@media ${device.tablet} {
		padding: 5px 16px;
	}
`
const PlayerLeft = styled.div`
	width: 70%;
	display: flex;
	align-items: center;
	@media ${device.tablet} {
		width: 100%;
	}
`
const PlayerInfo = styled.div`
	display: flex;
	align-items: center;
`
const PlayerNameAndPosition = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-left: 16px;
	@media ${device.mobileL} {
		max-width: 150px;
	}
`

const PlayerName = styled.div`
	@media ${device.mobileL} {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}
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
	min-width: 40px;
	min-height: 40px;
	border-radius: 100%;
	object-fit: contain;
	object-position: top center;
`
const NoImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	min-width: 40px;
	min-height: 40px;
	border-radius: 100%;
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
	@media ${device.tablet} {
		width: 0%;
	}
`

const PlayerRightHeight = styled.div`
	@media ${device.tablet} {
		display: none;
	}
`
const PlayerRightWeight = styled.div`
	@media ${device.tablet} {
		display: none;
	}
`
const PlayerRightbBirthday = styled.div`
	@media ${device.tablet} {
		display: none;
	}
`

const EmptyPlayers = styled.div`
	padding: 5px 32px;
	font-family: 'Avenir Medium';
	font-size: 18px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.grey};
`
