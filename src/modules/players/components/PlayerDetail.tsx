import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useAuth } from '../../../common/hooks/useAuth'
import { IPlayers } from '../interfaces/types'
import { LinkComponent } from '../../../ui/Link'
import { ReactComponent as NoImageSVG } from '../../../assets/images/noImage.svg'
import { LoadingComponent } from '../../../ui/Loading'
import { getPlayer, removePlayer } from '../../../api/players/playerService'
import { showToast } from '../../../ui/ToastrNotification'

dayjs.extend(utc)

export const PlayerDetail: FC = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { token } = useAuth()
	const [player, setPlayer] = useState<IPlayers>()
	const [deletePlayer, setDeletePlayer] = useState<boolean>(false)
	const [decodedPlayerAvatar, setDecodedPlayerAvatar] = useState<{
		[key: string]: string
	}>()

	const [loading, setLoading] = useState<boolean>(false)

	// get player by id
	useEffect(() => {
		setLoading(true)

		if (params._id) {
			getPlayer(params._id)
				.then(result => {
					console.log('get player by id', result)

					if (result.success) {
						if (result.message instanceof Object) {
							setPlayer(result.message)
							// const avatar = convertBufferToUrl(result.message)
							// if (avatar) {
							// 	setDecodedPlayerAvatar(avatar)
							// }
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

	// delete one player by id
	useEffect(() => {
		if (!deletePlayer && !player?._id && !player?.team._id && !player?.name)
			return

		setLoading(true)

		if (deletePlayer && player?._id && player?.team._id && player?.name) {
			const query = new URLSearchParams()
			query.append('playerId', player._id)
			query.append('teamId', player.team._id)
			query.append('playerName', player.name)

			removePlayer(query, token)
				.then(result => {
					console.log('res delete player', result)
					if (result.success) {
						navigate('/players')
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
			setDeletePlayer(false)
		}
	}, [
		deletePlayer,
		navigate,
		player?._id,
		player?.name,
		player?.team._id,
		token,
	])

	return (
		<Container>
			{loading ? (
				<LoadingComponent />
			) : (
				<>
					{player ? (
						<>
							<DetailBlock>
								<HeaderDetail>
									<HeaderText>
										<LinkComponent route={'/players'} text={'Players'} />{' '}
										<Slash>/</Slash> {player.name}
									</HeaderText>

									<div>
										<ButtonEdit
											type="button"
											onClick={() =>
												navigate('/players/add', { state: { player } })
											}
										>
											<EditSVG />
										</ButtonEdit>
										<ButtonDelete
											type="button"
											onClick={() => setDeletePlayer(true)}
										>
											<DeleteSVG />
										</ButtonDelete>
									</div>
								</HeaderDetail>

								<MainDetail>
									<Left>
										{decodedPlayerAvatar && decodedPlayerAvatar[player._id] ? (
											<>
												<Img
													src={decodedPlayerAvatar[player._id]}
													alt={player.name}
												/>
											</>
										) : (
											<StyledNoImageSVG />
										)}
									</Left>
									<Right>
										<Name>
											{player.name}
											<Number>#{player?.number}</Number>{' '}
										</Name>
										<TextBlock>
											<TextColumn>
												<Key>Position</Key>
												<Value>{player.position}</Value>
											</TextColumn>

											<TextColumn>
												<Key>Team</Key>
												<Value>{player.team.name}</Value>
											</TextColumn>

											<TextColumn>
												<Key>Height</Key>
												<Value>{player.height} cm</Value>
											</TextColumn>

											<TextColumn>
												<Key>Weight</Key>
												<Value>{player.weight} kg</Value>
											</TextColumn>

											<TextColumn>
												<Key>Age</Key>

												<Value>
													{dayjs.utc().diff(dayjs.utc(player.birthday), 'year')}
												</Value>
											</TextColumn>
										</TextBlock>
									</Right>
								</MainDetail>
							</DetailBlock>
						</>
					) : null}
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
