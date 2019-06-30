import { TSources } from './Main'

export type TGetNewsArgs = {
	_sources: TSources
	category: string
}

export type TSearchArgs = {
	days: number
	query: string
}

export type TGoogleSearchArgs = {
	cx: string
	days: number
	key: string
	query: string
}

export type TGetGoolgeSearch = {
	cx: string
	days: number
	key: string
	page: number
	query: string
}

export type TYouTubeSearchArgs = {
	key: string
	query: string
}
