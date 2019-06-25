import NewsApi from 'newsapi'
import Main from './Main'
import { TSearchArgs, TGetGoolgeSearch, TYouTubeSearchArgs } from '../types/controllers/News'
import { Response } from 'express';

export default class News extends Main {
	private _session = new NewsApi(this.newsAPIKey)
	private _version2 = this._session.v2
	private session = this._version2

  private async getYouTubeResults(args: TYouTubeSearchArgs) {
    const queryURL = formatYouTubeQuery(args)
    const results = await Main.simpleFetch(queryURL)
    return results
  }

  private async getGoogleResults(args: TGetGoolgeSearch) {
    const queryURL = formatGoogleQuery(args);
    const results = await Main.simpleFetch(queryURL);
    return results;
  }

  private async getNewsCategory(category: string) {
    const { session, sources: _sources } = this
		const selectedSources = _sources[category]
		const sources = selectedSources.join(',')
		const config = { sources, language: 'en', pageSize: 100 }
		const output = await session.topHeadlines(config)
		return output
  }

  private async performGoogleSearch(args: TSearchArgs) {
    const { getGoogleResults, googleAPIKey: key, googleCX: cx } = this
		const { query, days } = args
		const hasArgs = query && days
		if (!hasArgs) throw new Error('Params are not properly set')
    if (hasArgs) return await getGoogleResults({ cx, days, key, query })
    return null
  }
  
  private async performYouTubeSearch(query: string) {
    const key = this.googleAPIKey
    const hasArgs = query && key
    if (!hasArgs) throw new Error('Params are not properly set')
    if (hasArgs) return await this.getYouTubeResults({ key, query })
    return null
  }

  public async getHeadlines(category: string, res: Response) {
    const results = await this.getNewsCategory(category)
    res.send({ data: results })
  }

  public async getSearch(query: string, res: Response) {
    const results = await this.performGoogleSearch({ query, days: 30 })
    res.send({ data: results })
  }

  public async getYouTube(query: string, res: Response) {
    const results = await this.performYouTubeSearch(query)
    res.send({ data: results })
  }

  static formatGoogleQuery(args: TGetGoolgeSearch) {
		const { cx, days, key, query } = args
		return `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}&dateRestrict=${days}`
  }
  
  static formatYouTubeQuery(args: TYouTubeSearchArgs) {
    const { query, key } = args
    return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${key}`
  }
}

export const formatGoogleQuery = News.formatGoogleQuery
export const formatYouTubeQuery = News.formatYouTubeQuery