import { IRequestBaseBody } from '../common/interfaces/types'

const baseUrl = process.env.REACT_APP_BASE_URL

export const baseRequest = async <T>(
	url: string,
	data: IRequestBaseBody,
	token: string | undefined
): Promise<T> => {
	const headersForToken = token
		? {
				Authorization: `Bearer ${token}`,
		  }
		: {}

	const headersForMultiPart =
		typeof data.body === 'string'
			? {
					'Content-Type': 'application/json; charset=utf-8',
			  }
			: {}

	console.log('baseData', data)
	console.log('token', token)
	console.log('url', url)

	const response = await fetch(url, {
		...data,
		headers: {
			...(headersForToken as HeadersInit),
			...(headersForMultiPart as HeadersInit),
		},
	})

	if (response.ok) {
		return (await response.json()) as T
	}

	// eslint-disable-next-line no-throw-literal
	throw { isCustomError: true, status: response.status }
}

export const get = <T>(url: string, token?: string) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'GET' }, token)
}

export const post = <T>(
	url: string,
	token?: string,
	body?: string | FormData
) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'POST', body }, token)
}

export const patch = <T>(
	url: string,
	token?: string,
	body?: string | FormData
) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'PATCH', body }, token)
}

export const remove = <T>(url: string, token?: string) => {
	return baseRequest<T>(`${baseUrl}${url}`, { method: 'DELETE' }, token)
}

// if (!response.ok) {
// 	if (response.status === 401) {
// 		throw new Error('Please authorization!')
// 	} else if (response.status === 403) {
// 		throw new Error('Access denied!')
// 	} else if (response.status === 500) {
// 		throw new Error('Server error! Try again later.')
// 	}
// 	throw new Error(`HTTP error! Status: ${response.status}`)
// }

// } catch (error) {
// if (error instanceof TypeError && error.message === 'Failed to fetch') {
// 	throw new Error('Network error! Check your internet connection.')
// } else if (error instanceof SyntaxError) {
// 	throw new Error('Invalid response from server!')
// }
// throw error
// }
