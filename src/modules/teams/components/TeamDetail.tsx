import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import { FC, useEffect, useState } from 'react'
import { ITeams } from '../interfaces/types'
import { LoadingComponent } from '../../../ui/Loading'
import { LinkComponent } from '../../../ui/Link'
import { useAuth } from '../../../common/hooks/useAuth'
import { convertBufferToUrl } from '../helpers/converterBufferToUrl'
import { convertBufferToUrl as convertBufferToUrlForPlayers } from '../../players/helpers/converterBufferToUrl'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getTeam, removeTeam } from '../../../api/teams/teamsService'
import { showToast } from '../../../ui/ToastrNotification'

dayjs.extend(utc)

export const TeamDetail: FC = () => {
	const { token } = useAuth()
	const [team, setTeam] = useState<ITeams>()
	const [deleteTeam, setDeleteTeam] = useState<boolean>(false)
	const [decodedTeamAvatar, setDecodedTeamAvatar] = useState<{
		[key: string]: string
	}>({})
	const [decodedPlayerAvatar, setDecodedPlayerAvatar] = useState<{
		[key: string]: string
	}>({})

	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()
	const navigate = useNavigate()

	// get team by id
	useEffect(() => {
		setLoading(true)

		if (params._id) {
			getTeam(params._id)
				.then(result => {
					console.log('get team by id', result)
					if (result.success) {
						if (result.message instanceof Object) {
							setTeam(result.message)
							const teamAvatar = convertBufferToUrl(result.message)
							if (teamAvatar) {
								setDecodedTeamAvatar(teamAvatar)
							}
							const playerAvatar = convertBufferToUrlForPlayers(
								result.message.players
							)
							if (playerAvatar) {
								setDecodedPlayerAvatar(playerAvatar)
							}
						}
					}
					if (!result.success) {
						if (typeof result.message === 'string') {
							showToast({
								type: 'error',
								message: `${result.message}`,
							})
						}
					}
				})
				.catch(error => {
					console.log('error', error)
				})
				.finally(() => setLoading(false))
		}
	}, [params])

	// delete one team by id
	useEffect(() => {
		if (!deleteTeam && !team?._id) return

		setLoading(true)

		if (deleteTeam && team?._id) {
			removeTeam(team._id, token)
				.then(result => {
					console.log('delete team by id', result)
					if (result.success) {
						navigate('/teams')
						showToast({
							type: 'success',
							message: `${result.message}`,
						})
					}
					if (!result.success) {
						showToast({
							type: 'error',
							message: `${result.message}`,
						})
					}
				})
				.catch(error => {
					console.log('error', error)
				})
				.finally(() => setLoading(false))
		}
		return () => {
			setDeleteTeam(false)
		}
	}, [deleteTeam, navigate, team?._id, token])

	return (
		<Container>
			{loading ? (
				<LoadingComponent />
			) : (
				<>
					{team ? (
						<>
							<DetailBlock>
								<HeaderDetail>
									<HeaderText>
										<LinkComponent route={'/teams'} text={'Teams'} />{' '}
										<Slash>/</Slash> {team.name}
									</HeaderText>

									<div>
										<ButtonEdit
											type="button"
											onClick={() =>
												navigate('/teams/add', { state: { team } })
											}
										>
											<EditSVG />
										</ButtonEdit>
										<ButtonDelete
											type="button"
											onClick={() => setDeleteTeam(true)}
										>
											<DeleteSVG />
										</ButtonDelete>
									</div>
								</HeaderDetail>

								<MainDetail>
									<Left>
										{decodedTeamAvatar && decodedTeamAvatar[team._id] ? (
											<Img src={decodedTeamAvatar[team._id]} alt={team.name} />
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
						</>
					) : null}

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

							{team?.players.length ? (
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
													{decodedPlayerAvatar &&
													decodedPlayerAvatar[player._id] ? (
														<PlayerImg
															src={decodedPlayerAvatar[player._id]}
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
			)}
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
