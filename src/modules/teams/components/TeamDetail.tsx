import styled from 'styled-components'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import playerLogo from '../../../assets/images/Player.png'
import { FC, useEffect, useState } from 'react'
import { get, remove } from '../../../api/baseRequest'
import { ITeams } from '../interfaces/types'
import { NotificationComponent } from '../../../ui/Notification'
import { LoadingComponent } from '../../../ui/Loading'
import { LinkComponent } from '../../../ui/Link'
import { useAuth } from '../../../common/hooks/useAuth'

export const TeamDetail: FC = () => {
	const { token } = useAuth()
	const [team, setTeam] = useState<ITeams>()
	const [deleteTeam, setDeleteTeam] = useState<boolean>(false)
	const [decodedTeamAvatar, setDecodedTeamAvatar] = useState<string>()
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	// get team by id
	useEffect(() => {
		setLoading(true)
		if (params._id) {
			get(`/teams/get/${params._id}`, undefined)
				.then(result => {
					console.log('get team by id', result)
					if (result.success) {
						const teamCopy = JSON.parse(
							JSON.stringify(result.message)
						) as ITeams

						if (teamCopy.teamImg && teamCopy.teamImg.data) {
							const byteArray = new Uint8Array(teamCopy.teamImg.data) // Декодируем Buffer
							const blob = new Blob([byteArray], { type: 'image/jpeg' }) // Создаём Blob
							setDecodedTeamAvatar(URL.createObjectURL(blob)) // Генерируем URL
						}
						setTeam(result.message)
						setLoading(false)
					}
					if (!result.success) {
						setNotification(`${result.message}`)
						setLoading(false)
					}
				})
				.catch(error => {
					console.log('error', error)
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
					setLoading(false)
				})
		}
	}, [params])

	// update team by id

	// delete team by id
	useEffect(() => {
		setLoading(true)
		if (deleteTeam) {
			remove(`/teams/delete/${team?._id}`, token)
				.then(result => {
					console.log('delete team by id', result)
					if (result.success) {
						navigate('/teams', { state: { successDelete: result.message } })
						setLoading(false)
					}
					if (!result.success) {
						setNotification(`${result.message}`)
						setLoading(false)
					}
				})
				.catch(error => {
					console.log('error', error)
					setNotification(
						`Something going wrong... Error status: ${error.status}`
					)
					setLoading(false)
				})
		}
		return () => {
			setDeleteTeam(false)
		}
	}, [deleteTeam])

	const players: any[] = [
		{
			_id: '12345235213233',
			name: 'Bol Bol',
			position: 'Centerforward',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 3,
			playerImg: 'img',
		},
		{
			_id: '2',
			name: 'Greg Whittington',
			position: 'Forward',
			height: 218,
			weight: 100,
			birthday: 21,
			playerImg: 'img',
		},
		{
			_id: '3',
			name: 'Zeke Nnaji',
			position: 'Forward-center',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 99,
			playerImg: 'img',
		},
		{
			_id: '546456',
			name: 'R. J. Hampton',
			position: 'Defender',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 1,
			playerImg: 'img',
		},
		{
			_id: '4322342',
			name: 'Bol Bol',
			position: 'Centerforward',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 3,
			playerImg: 'img',
		},
		{
			_id: '123455235235235213233',
			name: 'Bol Bol',
			position: 'Centerforward',
			height: 218,
			weight: 100,
			birthday: 21,
			number: 3,
			playerImg: 'img',
		},
	]

	const closeNotification = () => setNotification(null)
	return (
		<Container $loading={loading}>
			{loading ? (
				<LoadingComponent />
			) : (
				<>
					<DetailBlock>
						<HeaderDetail>
							<HeaderText>
								<LinkComponent route={'/teams'} text={'Teams'} />{' '}
								<Slash>/</Slash> {team?.name}
							</HeaderText>

							<div>
								<ButtonEdit
									type="button"
									onClick={() => navigate('/teams/add', { state: { team } })}
								>
									<EditSVG />
								</ButtonEdit>
								<ButtonDelete type="button" onClick={() => setDeleteTeam(true)}>
									<DeleteSVG />
								</ButtonDelete>
							</div>
						</HeaderDetail>

						<MainDetail>
							<Left>
								{decodedTeamAvatar ? (
									<Img src={decodedTeamAvatar} alt={team?.name} />
								) : (
									<div>Loading image...</div>
								)}
							</Left>
							<Right>
								<Name>{team?.name}</Name>
								<TextBlock>
									<TextColumn>
										<Key>Year of foundation</Key>
										<Value>{team?.year}</Value>
									</TextColumn>
									<TextColumn>
										<Key>Division</Key>
										<Value>{team?.division}</Value>
									</TextColumn>
									<TextColumn>
										<Key>Conference</Key>
										<Value>{team?.conference}</Value>
									</TextColumn>
								</TextBlock>
							</Right>
						</MainDetail>
					</DetailBlock>

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

							{players.length ? (
								<>
									{players.map(player => (
										<Player key={player._id}>
											<PlayerLeft>
												<MarginRight>
													<PlayerNumber>
														{player.number ? player.number : '-'}
													</PlayerNumber>
												</MarginRight>

												<PlayerInfo>
													<PlayerImg src={playerLogo} alt="player" />
													<PlayerNameAndPosition>
														<div>{player.name}</div>
														<PlayerPosition>{player.position}</PlayerPosition>
													</PlayerNameAndPosition>
												</PlayerInfo>
											</PlayerLeft>
											<PlayerRight>
												<div>{player.height} cm</div>
												<div>{player.weight} kg</div>
												<div>{player.birthday}</div>
											</PlayerRight>
										</Player>
									))}
								</>
							) : (
								<EmptyPlayers>Team doesn't have any players...</EmptyPlayers>
							)}
						</RosterTable>
					</RosterBlock>
				</>
			)}
			{notification ? (
				<NotificationComponent
					error={location.state?.name ? false : true}
					message={notification}
					close={closeNotification}
				/>
			) : null}
		</Container>
	)
}

const Container = styled.div<{
	$loading: boolean
}>`
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
	padding: 5px 32px;
	display: flex;
	justify-content: space-between;
	border-top: solid 0.5px ${({ theme }) => theme.colors.lightGrey};
	font-family: 'Avenir Medium';
	font-size: 14px;
	font-weight: 500;
	line-height: 24px;
	color: ${({ theme }) => theme.colors.grey};
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
	font-size: 12px;
	font-weight: 500;
	line-height: 18px;
	color: ${({ theme }) => theme.colors.lightestRed};
`
