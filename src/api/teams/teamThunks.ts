import { createAsyncThunk } from '@reduxjs/toolkit'
import { closeLoader, showLoader } from '../../core/redux/loaderSlice'
import {
	createTeams,
	getTeam,
	getTeams,
	patchTeam,
	removeTeam,
} from './teamsService'
import { convertBufferToUrl } from '../../common/helpers/converterBufferToUrl'
import { IServerTeams, ITeams } from '../../modules/teams/interfaces/types'
import { IPlayers } from '../../modules/players/interfaces/types'

// create team
export const createTeamThunk = createAsyncThunk(
	'teams/createOne',
	async (
		payload: { body: FormData; token: string | null },
		{ dispatch, rejectWithValue }
	) => {
		try {
			dispatch(showLoader())
			const { body, token } = payload

			if (!token) {
				return rejectWithValue('Failed to create a Team! Token is Null!')
			}

			if (!body) {
				return rejectWithValue('Failed to create a Team! Body is Undefined!')
			}

			const response = await createTeams(body, token)
			if (response.success && response.message instanceof Object) {
				const serverTeam = response.message.team as IServerTeams
				const avatarsTeam = convertBufferToUrl({ team: [serverTeam] })
				const players = serverTeam.players || []
				const avatarsPlayer = convertBufferToUrl({ player: players })

				const convertedPlayers: IPlayers[] = players.map(player => {
					return {
						...player,
						team: null,
						playerImg:
							player._id in avatarsPlayer ? avatarsPlayer[player._id] : '',
					}
				})

				const convertedTeam: ITeams = {
					...serverTeam,
					teamImg:
						serverTeam._id in avatarsTeam ? avatarsTeam[serverTeam._id] : '',
					players: convertedPlayers,
				}

				convertedPlayers.forEach(player => {
					player.team = convertedTeam
				})

				return { createdTeam: convertedTeam }
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to create a Team!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to create a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get all teams
export const getTeamsThunk = createAsyncThunk(
	'teams/getAll',
	async (query: URLSearchParams, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())

			const response = await getTeams(query)

			console.log('response', response)

			if (response.success && response.message instanceof Object) {
				console.log('s servera', response.message.teams)
				// Преобразуем данные из серверного формата
				const serverTeams = response.message.teams as IServerTeams[]

				console.log('serverTeams', serverTeams)

				const avatarsTeam = convertBufferToUrl({ team: serverTeams })

				const allPlayers =
					serverTeams && serverTeams.length > 0
						? serverTeams.flatMap(team => team.players)
						: []

				const avatarsPlayer = convertBufferToUrl({ player: allPlayers })

				// Преобразуем команды в формат с URL-строками
				const teams: ITeams[] = serverTeams.map(team => {
					// Преобразуем игроков
					const convertedPlayers: IPlayers[] = team.players.map(player => {
						return {
							...player,
							team: null, // Временно устанавливаем null, т.к. circular reference
							playerImg:
								player._id in avatarsPlayer ? avatarsPlayer[player._id] : '', // Пустая строка, если нет URL
						}
					})

					// Преобразуем команду
					const convertedTeam: ITeams = {
						...team,
						teamImg: team._id in avatarsTeam ? avatarsTeam[team._id] : '', // Пустая строка, если нет URL
						players: convertedPlayers,
					}

					// Устанавливаем правильную ссылку на команду для игроков
					convertedPlayers.forEach(player => {
						player.team = convertedTeam
					})

					return convertedTeam
				})

				console.log('v redux', teams)
				return {
					teams,
					countTeams: response.message.countTeams,
					avatarsTeam,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to get all Teams!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to get all Teams!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get one team
export const getTeamThunk = createAsyncThunk(
	'teams/getOne',
	async (teamId: string | undefined, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())

			if (!teamId) {
				return rejectWithValue('Failed to get a Team! Team ID is Undefined!')
			}

			const response = await getTeam(teamId)

			if (response.success && response.message instanceof Object) {
				const serverTeam = response.message as IServerTeams
				const avatarsTeam = convertBufferToUrl({ team: [serverTeam] })
				const players = serverTeam.players || []
				const avatarsPlayer = convertBufferToUrl({
					player: players,
				})

				const convertedPlayers: IPlayers[] = players.map(player => {
					return {
						...player,
						team: null,
						playerImg:
							player._id in avatarsPlayer ? avatarsPlayer[player._id] : '',
					}
				})

				const convertedTeam: ITeams = {
					...serverTeam,
					teamImg:
						serverTeam._id in avatarsTeam ? avatarsTeam[serverTeam._id] : '',
					players: convertedPlayers,
				}

				convertedPlayers.forEach(player => {
					player.team = convertedTeam
				})

				return {
					team: convertedTeam,
					avatarsTeam,
					avatarsPlayer,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to get a Team!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to get a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// update team
export const updateTeamThunk = createAsyncThunk(
	'teams/updateOne',
	async (
		payload: { body: FormData; token: string | null },
		{ dispatch, rejectWithValue }
	) => {
		try {
			dispatch(showLoader())
			const { body, token } = payload

			if (!token) {
				return rejectWithValue('Failed to update a Team! Token is Null!')
			}

			if (!body) {
				return rejectWithValue('Failed to update a Team! Body is Undefined!')
			}

			const response = await patchTeam(body, token)
			if (response.success && response.message instanceof Object) {
				const serverTeam = response.message as IServerTeams
				const avatarsTeam = convertBufferToUrl({ team: [serverTeam] })
				const players = serverTeam.players || []
				const avatarsPlayer = convertBufferToUrl({ player: players })

				const convertedPlayers: IPlayers[] = players.map(player => {
					return {
						...player,
						team: null,
						playerImg:
							player._id in avatarsPlayer ? avatarsPlayer[player._id] : '',
					}
				})

				const convertedTeam: ITeams = {
					...serverTeam,
					teamImg:
						serverTeam._id in avatarsTeam ? avatarsTeam[serverTeam._id] : '',
					players: convertedPlayers,
				}

				convertedPlayers.forEach(player => {
					player.team = convertedTeam
				})

				return { updatedTeam: convertedTeam }
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to update a Team!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to update a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// remove team

export const removeTeamThunk = createAsyncThunk(
	'teams/removeOne',
	async (
		payload: { teamId: string | undefined; token: string | null },
		{ rejectWithValue, dispatch }
	) => {
		try {
			dispatch(showLoader())
			const { teamId, token } = payload

			if (!token) {
				return rejectWithValue('Failed to remove a Team! Token is Null!')
			}

			if (!teamId) {
				return rejectWithValue('Failed to remove a Team! Team ID is Undefined!')
			}

			const response = await removeTeam(teamId, token)
			if (response.success) {
				return { removedTeam: response.message, teamId }
			} else {
				return rejectWithValue(response.message || 'Failed to remove a Team!')
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to remove a Team!')
		} finally {
			dispatch(closeLoader())
		}
	}
)
