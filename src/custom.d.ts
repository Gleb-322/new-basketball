declare module '*.ttf'
declare module '*.eot'
declare module '*.woff'
declare module '*.woff2'

declare module '*.svg' {
	import * as React from 'react'

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>

	const src: string
	export default src
}

declare module '*.png' {
	const value: import('react').ImageSourcePropType
	export default value
}

declare module '*.jpg' {
	const value: import('react').ImageSourcePropType
	export default value
}
