import { createAsyncThunk } from '@reduxjs/toolkit'
import { closeLoader, showLoader } from '../../core/redux/loaderSlice'
import {
	createPlayers,
	getPlayer,
	getPlayers,
	patchPlayer,
	removePlayer,
} from './playersService'
import { getTeams } from '../teams/teamsService'

// create player
export const createPlayerThunk = createAsyncThunk(
	'players/createOne',
	async (
		payload: { body: FormData; token: string | null },
		{ rejectWithValue, dispatch }
	) => {
		try {
			dispatch(showLoader())
			const { body, token } = payload

			if (!token) {
				return rejectWithValue('Failed to create a Player! Token is Null!')
			}

			if (!body) {
				return rejectWithValue('Failed to create a Player! Body is Undefined!')
			}

			const response = await createPlayers(body, token)

			if (response.success && response.message instanceof Object) {
				return { createdPlayer: response.message.player }
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to create a Player!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to create a Player!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get all players
export const getPlayersThunk = createAsyncThunk(
	'players/getAll',
	async (query: URLSearchParams, { rejectWithValue, dispatch }) => {
		try {
			dispatch(showLoader())

			const response = await getPlayers(query)

			if (response.success && response.message instanceof Object) {
				return {
					players: response.message.players,
					// players: [],
					countPlayers: response.message.countPlayers,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to get all Players!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to get all Players!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get one player
export const getPlayerThunk = createAsyncThunk(
	'players/getOne',
	async (playerId: string | undefined, { rejectWithValue, dispatch }) => {
		try {
			dispatch(showLoader())

			if (!playerId) {
				return rejectWithValue(
					'Failed to get a Player! Player ID is Undefined!'
				)
			}

			const response = await getPlayer(playerId)

			if (response.success && response.message instanceof Object) {
				return {
					player: response.message,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to get a Player!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to get a Player!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// update player
export const updatePlayerThunk = createAsyncThunk(
	'players/updateOne',
	async (
		payload: { body: FormData; token: string | null },
		{ rejectWithValue, dispatch }
	) => {
		try {
			dispatch(showLoader())
			const { token, body } = payload

			if (!token) {
				return rejectWithValue('Failed to update a Player! Token is Null!')
			}

			if (!body) {
				return rejectWithValue('Failed to update a Player! Body is Undefined!')
			}

			const response = await patchPlayer(body, token)

			if (response.success && response.message instanceof Object) {
				return {
					updatedPlayer: response.message,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to update a Player!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to update a Player!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// remove player
export const removePlayerThunk = createAsyncThunk(
	'players/removeOne',
	async (
		payload: { query: URLSearchParams; token: string | null },
		{ rejectWithValue, dispatch }
	) => {
		try {
			dispatch(showLoader())
			const { token, query } = payload

			if (!token) {
				return rejectWithValue('Failed to remove a Player! Token is Null!')
			}

			let playerId: string | null

			if (query.has('playerId') && query.has('teamId')) {
				playerId = query.get('playerId')
			} else {
				return rejectWithValue(
					'Failed to remove a Player! Player ID is Undefined!'
				)
			}

			const response = await removePlayer(query, token)

			if (response.success) {
				return {
					removedPlayer: response.message,
					playerId,
				}
			} else {
				return rejectWithValue(
					typeof response.message === 'string'
						? response.message
						: 'Failed to update a Player!'
				)
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to update a Player!')
		} finally {
			dispatch(closeLoader())
		}
	}
)

// get all teams for multi select for players filter
export const getMultiSelectOptionsThunk = createAsyncThunk(
	'players/getMultiOptions',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			dispatch(showLoader())

			const response = await getTeams()

			if (response.success && response.message instanceof Object) {
				const teamOptions = response.message.teams.map(team => ({
					value: team.name,
					label: team.name,
					teamId: team._id,
				}))

				return {
					teamOptions,
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
