import { TSources } from './Main'

export type TGetNewsArgs = {
	category: string
	_sources: TSources
}

export type TSearchArgs = {
	query: string
	days: number
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
	query: string
}

export type TYouTubeSearchArgs = {
	query: string
	key: string
}
