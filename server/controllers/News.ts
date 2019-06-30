import NewsApi from 'newsapi'
import Main from './Main'
import NewsFormatter from '../Utils/NewsFormatter'
import { TSearchArgs, TGetGoolgeSearch, TYouTubeSearchArgs } from '../types/controllers/News'
import { Response, Request } from 'express'
import { Data as IYoutubeResponse } from '../types/api/youtube'
import { Data as IGoogleResponse } from '../types/api/google'
import { Data as INewsResponse } from '../types/api/news'
import { flatMap } from '../Utils/Utils'

export default class News extends Main {
	private _session = new NewsApi(this.newsAPIKey)
	private _version2 = this._session.v2
	private session = this._version2

	private getYouTubeResults = async (args: TYouTubeSearchArgs) => {
		const queryURL = this.formatYouTubeQuery(args),
			results: IYoutubeResponse = await this.simpleFetch(queryURL)
		return results
	}

	private getGoogleResults = async (args: TGetGoolgeSearch) => {
		const queryURL = this.formatGoogleQuery(args),
			results: IGoogleResponse = await this.simpleFetch(queryURL)
		return results
	}

	private performNewsSearch = async (category: string) => {
		const { session, sources: _sources } = this,
			selectedSources = _sources[category],
			sources = selectedSources.join(','),
			config = { sources, language: 'en', pageSize: 100 },
			output: INewsResponse = await session.topHeadlines(config)
		return output
	}

	private performGoogleSearch = async (args: TSearchArgs) => {
		const { getGoogleResults, googleAPIKey: key, googleCX: cx } = this,
			{ query, days } = args,
			hasArgs = query && days,
			maxPages = 3
		let page = 1,
			output: IGoogleResponse[] = []
		if (!hasArgs) throw new Error('Params are not properly set')
		if (hasArgs) {
			while (page <= maxPages) {
				const _results = await getGoogleResults({ cx, days, key, query, page })
				output = [ ...output, _results ]
				page++
			}
			return output
		}
		return null
	}

	private performYouTubeSearch = async (query: string) => {
		const key = this.googleAPIKey,
			hasArgs = query && key
		if (!hasArgs) throw new Error('Params are not properly set')
		if (hasArgs) return await this.getYouTubeResults({ key, query })
		return null
	}

	private getAllNews = async () => {
		const searchQueries = this.sources.queries,
			_topHeadlines = await this.performNewsSearch('generalNews'),
			_techHeadlines = await this.performNewsSearch('techNews'),
			_rawSearchResults = await Promise.all(searchQueries.map(query => this.performGoogleSearch({ query, days: 1 }))),
			_searchResults = _rawSearchResults.map(result =>
				flatMap(result.map(item => NewsFormatter.formatGoogleData(item)))
			),
			_rawTechHeadlines = NewsFormatter.formatNewsData(_techHeadlines),
			techHeadlines = _rawTechHeadlines.map(item => ({ ...item, topic: 'techNews' })),
			searchResults = flatMap(_searchResults),
			topHeadlines = NewsFormatter.formatNewsData(_topHeadlines),
			output = [ ...searchResults, ...topHeadlines, ...techHeadlines ]
		return output
	}

	public getHeadlines = async (category: string, res: Response) => {
		const _results = await this.performNewsSearch(category),
			results = NewsFormatter.formatNewsData(_results)
		res.send({ data: results })
	}

	public async getSearch(query: string, res: Response) {
		const _results = await this.performGoogleSearch({ query, days: 1 }),
			results = flatMap(_results.map(result => NewsFormatter.formatGoogleData(result)))
		res.send({ data: results })
	}

	public getYouTube = async (query: string, res: Response) => {
		const _results = await this.performYouTubeSearch(query),
			results = NewsFormatter.formatYoutubeData(_results, query)
		res.send({ data: results })
	}

	public formatGoogleQuery = (args: TGetGoolgeSearch) => {
		const { cx, days, key, query, page } = args
		return `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}&dateRestrict=${days}&start=${page}0`
	}

	public formatYouTubeQuery = (args: TYouTubeSearchArgs) => {
		const { query, key } = args
		return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${key}`
	}

	public getNews = async (res: Response) => {
		res.send({ data: await this.getAllNews() })
	}

	public parseArticle = async (req: Request, res: Response) => {
		const { url } = req.body,
			data = await this.getReaderView(url)
		res.send({ data })
	}
}
