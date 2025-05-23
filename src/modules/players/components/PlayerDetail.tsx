import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../assets/icons/create.svg'
import { ReactComponent as NoImageSVG } from '../../../assets/images/noImage.svg'
import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { LinkComponent } from '../../../ui/Link'
import { showToast } from '../../../ui/ToastrNotification'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { RootState } from '../../../core/redux/store'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import {
	getPlayerThunk,
	removePlayerThunk,
} from '../../../api/players/playerThunks'
import { resetPlayerState, selectPlayerById } from '../playerSlice'
import { device } from '../../../common/helpers/breakpoint'

dayjs.extend(utc)

export const PlayerDetail: FC = () => {
	const { token } = useAppSelector((state: RootState) => state.user)
	const dispatch = useAppDispatch()
	const params = useParams()
	const navigate = useNavigate()

	const { status, error, lastRemovedPlayer } = useAppSelector(
		(state: RootState) => state.player
	)

	const player = useAppSelector((state: RootState) =>
		params._id ? selectPlayerById(state, params._id) : undefined
	)

	// get player by id
	useEffect(() => {
		if (params._id) {
			dispatch(getPlayerThunk(params._id))
		}
	}, [dispatch, params._id])

	// delete player
	useEffect(() => {
		if (status === 'success' && lastRemovedPlayer) {
			navigate('/players')
			showToast({
				type: 'success',
				message: `${lastRemovedPlayer}`,
			})
		}

		if (status === 'error' && error) {
			showToast({
				type: 'error',
				message: `${error}`,
			})
		}

		return () => {
			dispatch(resetPlayerState())
		}
	}, [status, error, navigate, lastRemovedPlayer, dispatch])

	const removePlayer = () => {
		if (player?._id && player?.team._id) {
			const query = new URLSearchParams()
			query.append('playerId', player._id)
			query.append('teamId', player.team._id)
			dispatch(
				removePlayerThunk({
					query,
					token,
				})
			)
		} else {
			return
		}
	}

	return (
		<Container>
			{player && (
				<DetailBlock>
					<HeaderDetail>
						<HeaderText>
							<LinkComponent route={'/players'} text={'Players'} />{' '}
							<Slash>/</Slash> {player.name}
						</HeaderText>

						<HeaderBtns>
							<ButtonEdit
								type="button"
								onClick={() => navigate('/players/add', { state: { player } })}
							>
								<EditSVG />
							</ButtonEdit>
							<ButtonDelete type="button" onClick={removePlayer}>
								<DeleteSVG />
							</ButtonDelete>
						</HeaderBtns>
					</HeaderDetail>

					<MainDetail>
						<Left>
							{player.playerImg ? (
								<Img
									src={`${process.env.REACT_APP_BASE_URL_IMAGE}${player.playerImg}`}
									alt={player.name}
								/>
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
			)}
		</Container>
	)
}
const Container = styled.div`
	position: relative;
`
const DetailBlock = styled.div`
	border-radius: 10px;
	background: ${({ theme }) => theme.colors.gradientPlayerDetail};
	width: 100%;
	@media ${device.tablet} {
		border-radius: 0px;
		background: ${({ theme }) => theme.colors.gradientPlayerDetailTablet};
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
const HeaderText = styled.div`
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
	justify-content: space-between;
	width: 100%;
	@media ${device.tablet} {
		flex-direction: column;
	}
`

const Left = styled.div`
	width: 40%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	@media ${device.laptop} {
		width: 35%;
	}
	@media ${device.tablet} {
		margin-top: 48px;
		width: 100%;
		height: 112px;
		overflow: hidden;
	}
`
const Img = styled.img`
	width: 100%;
	height: 460px;
	border-bottom-left-radius: 10px;
	object-fit: contain;
	object-position: center center;
	@media ${device.custom1640} {
		object-fit: cover;
	}
	@media ${device.tablet} {
		width: 143px;
		height: 100%;
		border-radius: 0;
		object-position: top center;
	}
`
const StyledNoImageSVG = styled(NoImageSVG)`
	width: 100%;
	height: 100%;
	border-bottom-left-radius: 10px;
	@media ${device.tablet} {
		width: 143px;
		height: 100%;
		border-radius: 0;
	}
`

const Right = styled.div`
	width: 55%;
	padding: 65px 0;
	@media ${device.laptop} {
		width: 60%;
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
const Number = styled.span`
	margin-left: 5px;
	color: ${({ theme }) => theme.colors.lightRed};
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
const TextColumn = styled.div`
	display: flex;
	flex-direction: column;
	@media ${device.tablet} {
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
