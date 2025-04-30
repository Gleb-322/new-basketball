import { createAsyncThunk } from '@reduxjs/toolkit'
import { closeLoader, showLoader } from '../../core/redux/loaderSlice'
import {
	createTeams,
	getTeam,
	getTeams,
	patchTeam,
	removeTeam,
} from './teamsService'

import { IServerTeams, ITeams } from '../../modules/teams/interfaces/types'
import {
	IPlayers,
	IServerPlayers,
} from '../../modules/players/interfaces/types'
import { convertBufferToBase64AndFile } from '../../common/helpers/converterBufferToUrlAndFile'

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
				// const serverTeam = response.message.team as IServerTeams
				// const avatarsTeam = convertBufferToUrl({ team: [serverTeam] })
				// const players = serverTeam.players || []
				// const avatarsPlayer = convertBufferToUrl({ player: players })
				// const convertedPlayers: IPlayers[] = players.map(player => {
				// 	return {
				// 		...player,
				// 		team: null,
				// 		playerImg:
				// 			player._id in avatarsPlayer ? avatarsPlayer[player._id] : '',
				// 	}
				// })
				// const convertedTeam: ITeams = {
				// 	...serverTeam,
				// 	teamImg:
				// 		serverTeam._id in avatarsTeam ? avatarsTeam[serverTeam._id] : '',
				// 	players: convertedPlayers,
				// }
				// convertedPlayers.forEach(player => {
				// 	player.team = convertedTeam
				// })
				// return { createdTeam: convertedTeam }
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

			if (response.success && response.message instanceof Object) {
				const serverTeams = response.message.teams as IServerTeams[]

				console.log('serverTeams', serverTeams)

				const teams: ITeams[] = serverTeams.map(team => {
					const players = (team.players as IServerPlayers[]) || []

					const convertedTeamPlayers: IPlayers[] = players.map(player => {
						let playerImgUrl = ''
						let playerImgBase64 = ''
						let playerImgFile = null

						if (player.playerImg) {
							const playerImageConverted = convertBufferToBase64AndFile(
								player.playerImg
							)
							// playerImgUrl = playerImageConverted.objectUrl ?? ''
							playerImgBase64 = playerImageConverted.base64String
							playerImgFile = playerImageConverted.file
						}

						// const teamImageConvertedForPlayer = convertBufferToUrlAndFile(
						// 	player.team.teamImg
						// )
						// const convertedTeam: ITeams = {
						// 	...player.team,
						// 	teamImg: teamImageConvertedForPlayer.objectUrl ?? '',
						// 	file: teamImageConvertedForPlayer.file ?? null,
						// 	players: [],
						// }

						return {
							...player,
							team: team._id,
							playerImg: playerImgBase64,
							file: playerImgFile,
						}
					})

					const teamImageConverted = convertBufferToBase64AndFile(team.teamImg)

					return {
						...team,
						players: convertedTeamPlayers,
						teamImg: teamImageConverted.base64String ?? '',
						file: teamImageConverted.file ?? null,
					}
				})

				return {
					teams,
					countTeams: response.message.countTeams,
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
				// const serverTeam = response.message as IServerTeams
				// const avatarsTeam = convertBufferToUrl({ team: [serverTeam] })
				// const players = serverTeam.players || []
				// const avatarsPlayer = convertBufferToUrl({
				// 	player: players,
				// })
				// const convertedPlayers: IPlayers[] = players.map(player => {
				// 	return {
				// 		...player,
				// 		team: null,
				// 		playerImg:
				// 			player._id in avatarsPlayer ? avatarsPlayer[player._id] : '',
				// 	}
				// })
				// const convertedTeam: ITeams = {
				// 	...serverTeam,
				// 	teamImg:
				// 		serverTeam._id in avatarsTeam ? avatarsTeam[serverTeam._id] : '',
				// 	players: convertedPlayers,
				// }
				// convertedPlayers.forEach(player => {
				// 	player.team = convertedTeam
				// })
				// return {
				// 	team: convertedTeam,
				// 	avatarsTeam,
				// 	avatarsPlayer,
				// }
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
				// const serverTeam = response.message as IServerTeams
				// const avatarsTeam = convertBufferToUrl({ team: [serverTeam] })
				// const players = serverTeam.players || []
				// const avatarsPlayer = convertBufferToUrl({ player: players })
				// const convertedPlayers: IPlayers[] = players.map(player => {
				// 	return {
				// 		...player,
				// 		team: null,
				// 		playerImg:
				// 			player._id in avatarsPlayer ? avatarsPlayer[player._id] : '',
				// 	}
				// })
				// const convertedTeam: ITeams = {
				// 	...serverTeam,
				// 	teamImg:
				// 		serverTeam._id in avatarsTeam ? avatarsTeam[serverTeam._id] : '',
				// 	players: convertedPlayers,
				// }
				// convertedPlayers.forEach(player => {
				// 	player.team = convertedTeam
				// })
				// return { updatedTeam: convertedTeam }
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
