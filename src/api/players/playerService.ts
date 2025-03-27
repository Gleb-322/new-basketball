import {
	ICreatePlayersResponse,
	IRemovePlayerResponse,
	IGetPlayerResponse,
	IGetPlayersResponse,
	IPatchPlayerResponse,
} from '../../modules/players/interfaces/types'
import { get, post, patch, remove } from '../baseRequest'

const PLAYER_ENDPONT = '/players'

export const createPlayers = (
	body: FormData,
	token?: string
): Promise<ICreatePlayersResponse> => {
	return post(`${PLAYER_ENDPONT}/create`, token, body)
}

export const getPlayers = (
	query: URLSearchParams,
	token?: string
): Promise<IGetPlayersResponse> => {
	return get(`${PLAYER_ENDPONT}/get?${query.toString()}`, token)
}

export const getPlayer = (
	playerId: string,
	token?: string
): Promise<IGetPlayerResponse> => {
	return get(`${PLAYER_ENDPONT}/get/${playerId}`, token)
}

export const patchPlayer = (
	body: FormData,
	token?: string
): Promise<IPatchPlayerResponse> => {
	return patch(`${PLAYER_ENDPONT}/update`, token, body)
}

export const removePlayer = (
	query: URLSearchParams,
	token?: string
): Promise<IRemovePlayerResponse> => {
	return remove(`${PLAYER_ENDPONT}/delete?${query.toString()}`, token)
}
