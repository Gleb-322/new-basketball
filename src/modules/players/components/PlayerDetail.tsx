import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { get } from '../../../api/baseRequest'
import { convertBufferToUrl } from '../helpers/converterBufferToUrl'
import { useAuth } from '../../../common/hooks/useAuth'
import { IPlayers } from '../interfaces/types'
import { NotificationComponent } from '../../../ui/Notification'
import { LinkComponent } from '../../../ui/Link'
import { ReactComponent as NoImageSVG } from '../../../assets/images/noImage.svg'
import { LoadingComponent } from '../../../ui/Loading'

dayjs.extend(utc)

export const PlayerDetail: FC = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { token } = useAuth()
	const [player, setPlayer] = useState<IPlayers>()
	const [deletePlayer, setDeletePlayer] = useState<boolean>(false)
	const [decodedPlayerAvatar, setDecodedPlayerAvatar] = useState<
		string | { [key: string]: string }
	>()
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	// get player by id
	useEffect(() => {
		setLoading(true)

		if (params._id) {
			get(`/players/get/${params._id}`, undefined)
				.then(result => {
					console.log('get player by id', result)
					if (result.success) {
						const avatar = convertBufferToUrl(result.message)
						if (avatar) {
							setDecodedPlayerAvatar(avatar)
						}
						setPlayer(result.message)
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
	const closeNotification = () => setNotification(null)
	return (
		<Container>
			{loading ? (
				<LoadingComponent />
			) : (
				<DetailBlock>
					<HeaderDetail>
						<HeaderText>
							<LinkComponent route={'/players'} text={'Players'} />{' '}
							<Slash>/</Slash> {player?.name}
						</HeaderText>

						<div>
							<ButtonEdit>
								<EditSVG />
							</ButtonEdit>
							<ButtonDelete>
								<DeleteSVG />
							</ButtonDelete>
						</div>
					</HeaderDetail>

					<MainDetail>
						<Left>
							{typeof decodedPlayerAvatar === 'string' &&
							decodedPlayerAvatar ? (
								<Img src={decodedPlayerAvatar} alt={player?.name} />
							) : (
								<StyledNoImageSVG />
							)}
						</Left>
						<Right>
							<Name>
								{player?.name}
								<Number>#{player?.number}</Number>{' '}
							</Name>
							<TextBlock>
								<TextColumn>
									<Key>Position</Key>
									<Value>{player?.position}</Value>
								</TextColumn>

								<TextColumn>
									<Key>Team</Key>
									<Value>{player?.team.name}</Value>
								</TextColumn>

								<TextColumn>
									<Key>Height</Key>
									<Value>{player?.height} cm</Value>
								</TextColumn>

								<TextColumn>
									<Key>Weight</Key>
									<Value>{player?.weight} kg</Value>
								</TextColumn>

								<TextColumn>
									<Key>Age</Key>

									<Value>
										{dayjs.utc().diff(dayjs.utc(player?.birthday), 'year')}
									</Value>
								</TextColumn>
							</TextBlock>
						</Right>
					</MainDetail>
				</DetailBlock>
			)}
			{notification ? (
				<NotificationComponent
					error={true}
					message={notification}
					close={closeNotification}
				/>
			) : null}
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
	height: 600px;
`

const HeaderDetail = styled.header`
	padding: 18px 24px;
	height: 12%;
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
	height: 88%;
	width: 100%;
`

const Left = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`
const Img = styled.img`
	width: 530px;
	height: 460px;
`
const StyledNoImageSVG = styled(NoImageSVG)`
	width: 530px;
	height: 460px;
`

const Right = styled.div`
	width: 50%;
	padding: 65px 0;
`

const Name = styled.span`
	font-family: 'Avenir Black';
	font-size: 36px;
	font-weight: 900;
	color: ${({ theme }) => theme.colors.white};
`
const Number = styled.span`
	color: ${({ theme }) => theme.colors.lightRed};
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
