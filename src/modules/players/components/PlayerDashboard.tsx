import { FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IPlayers } from '../interfaces/types'
import { PlayerHeader } from './PlayerHeader'
import { PaginationComponent } from '../../../ui/Pagination'
import { SelectComponent } from '../../../ui/Select'
import { IOption, paginateOptions } from '../../../common/interfaces/types'
import { useLocation } from 'react-router'
import { PlayerList } from './PlayerList'
import { PlayerEmptyList } from './PlayerEmptyList'
import { LoadingComponent } from '../../../ui/Loading'
import { NotificationComponent } from '../../../ui/Notification'
import { get } from '../../../api/baseRequest'

export const PlayerDashboard: FC = () => {
	const [players, setPlayers] = useState<IPlayers[] | []>([])
	const [notification, setNotification] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [decodedAvatars, setDecodedAvatars] = useState<{
		[key: string]: string
	}>({})
	const [selectedOption, setSelectedOption] = useState<IOption>(
		paginateOptions[0]
	)
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageCount, setPageCount] = useState<number>(0)
	const [keyword, setKeyword] = useState<string>('')

	const location = useLocation()

	useEffect(() => {
		setLoading(true)
		get(
			`/players/get?page=${currentPage + 1}&limit=${
				selectedOption.value
			}&keyword=${keyword}`,
			undefined
		)
			.then(result => {
				console.log('res get players')
				if (result.success) {
					const playersCopy = JSON.parse(
						JSON.stringify(result.message.players)
					) as IPlayers[]
					const avatars: { [key: string]: string } = {}
					playersCopy.forEach((player: IPlayers) => {
						if (player.playerImg && player.playerImg.data) {
							// decode Buffer
							const arrayBuffer = new Uint8Array(player.playerImg.data)
							// create Blob
							const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })
							// create img Url
							avatars[player._id] = URL.createObjectURL(blob)
						}
					})
					setPageCount(
						Math.ceil(result.message.countPlayers / selectedOption.value)
					)
					setPlayers(result.message.players)
					setDecodedAvatars(avatars)
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
	}, [currentPage, keyword, selectedOption.value])

	useEffect(() => {
		if (location.state?.name) {
			setNotification(`${location.state?.name} player successful created!`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}

		if (location.state?.successDelete) {
			setNotification(`${location.state?.successDelete}`)
			const timer = setTimeout(() => {
				closeNotification()
			}, 6000)

			return () => clearTimeout(timer)
		}
	}, [location])

	const handlePageClick = (data: { selected: SetStateAction<number> }) => {
		console.log('pagination data', data)
		setCurrentPage(data.selected)
	}

	const closeNotification = () => setNotification(null)
	return (
		<>
			<PlayerHeader search={keyword} onSearch={setKeyword} />
			<Main $loading={loading}>
				{loading ? (
					<LoadingComponent />
				) : players.length ? (
					<PlayerList players={players} avatars={decodedAvatars} />
				) : (
					<PlayerEmptyList />
				)}

				{notification ? (
					<NotificationComponent
						error={location.state?.name ? false : true}
						message={notification}
						close={closeNotification}
					/>
				) : null}
			</Main>
			<Footer>
				{players.length > 0 ? (
					<>
						<PaginationComponent
							pageClick={handlePageClick}
							countPage={pageCount}
						/>
						<SelectComponent
							options={paginateOptions}
							selected={selectedOption}
							onSelect={setSelectedOption}
						/>
					</>
				) : null}
			</Footer>
		</>
	)
}

const Main = styled.div<{
	$loading: boolean
}>`
	width: 100%;
	display: ${({ $loading }) => ($loading ? 'flex' : 'grid')};
	justify-content: ${({ $loading }) => ($loading ? 'center' : 'none')};
	align-items: ${({ $loading }) => ($loading ? 'center' : 'none')};
	margin: 32px 0;
`

const Footer = styled.footer`
	width: 100%;
	height: 44px;
	padding: 2px 0;
	position: sticky;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: inherit;
	color: white;
`
