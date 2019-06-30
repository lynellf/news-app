import { Data as INewsData, Article } from '../types/api/news'
import { Data as IGoogleData, Item } from '../types/api/google'
import { Data as IYouTubeData, Item as IYouTubeItem } from '../types/api/youtube'
import { flatMap } from '../Utils/Utils'
import { IOutput } from '../types/api/Output'

const NewsModel = {
	formatNewsData: (newsData: INewsData) => {
		if (!newsData) return []
		const newsArticles = newsData.articles
		return newsArticles.map(article => mapArticle(article))
	},
	formatGoogleData: (gData: IGoogleData) => {
		if (!gData) return []
		const queries = gData.queries,
			requests = queries.request,
			currentRequest = requests[0],
			topic = currentRequest.searchTerms,
			results = gData.items,
			_output = results.map(result => mapGSearch(result, topic)),
			output = _output.filter(item => validateNewsItem(item))
		return output
	},
	formatYoutubeData: (ytData: IYouTubeData, query: string) => {
		if (!ytData) return []
		const items: IYouTubeItem[] = flatMap(ytData.items),
			_output = items.map(item => mapYTSearch(item, query)),
			output = _output.filter(item => validateNewsItem(item))
		return output
	},
	mapArticle: (article: Article) => {
		const source = article.source.name
		const output = { ...article, source, topic: 'top headlines' }
		delete output.content
		return output
	},
	mapGSearch: (item: Item, topic: string) => {
		const { metatags } = item.pagemap
		const {
			'article:published_time': publishedAt,
			'og:description': description,
			'og:image': urlToImage,
			'og:site_name': source,
			'og:url': url,
			author,
			title
		} = metatags[0]
		return {
			author,
			description,
			publishedAt,
			source,
			title,
			topic,
			url,
			urlToImage
		}
	},
	mapYTSearch: (item: IYouTubeItem, topic: string) => {
		const { id, snippet } = item
		const { videoId } = id
		const { publishedAt, title, description, thumbnails, channelTitle: source } = snippet
		const { high } = thumbnails
		const url = `https://www.youtube.com/embed/${videoId}`
		return {
			author: source,
			description,
			publishedAt,
			source,
			title,
			topic,
			url,
			urlToImage: high.url
		}
	},
	validateNewsItem: (item: IOutput) => {
		const { author, description, publishedAt, source, title, topic, url, urlToImage } = item
		const hasAllKeys = author && description && publishedAt && source && title && topic && url && urlToImage
		if (!hasAllKeys) return false
		return true
	}
}

export const {
	formatNewsData,
	formatGoogleData,
	formatYoutubeData,
	mapArticle,
	mapGSearch,
	mapYTSearch,
	validateNewsItem
} = NewsModel
export default NewsModel
