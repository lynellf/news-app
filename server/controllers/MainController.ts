import fs from 'fs'
import axios from 'axios'
import jsdom from 'jsdom'
import readability from 'moz-readability-node'
import { TSources } from '../types/controllers/Main'
import config from '../config.json'

export default class MainController {
	public bundleName = 'bundle'
	public googleAPIKey = ''
	public googleCX = ''
	public newsAPIKey = ''
	public port = 9000
	public sources: TSources = {
		generalNews: [],
		techNews: [],
		queries: []
	}
	public staticDir = 'server/public'

	constructor() {
		this.bundleName = config.bundleName
		this.googleAPIKey = config.googleAPIKey
		this.googleCX = config.googleCX
		this.newsAPIKey = config.newsAPIKey
		this.port = parseInt(config.port)
		this.sources = { ...config.sources }
		this.staticDir = config.staticDir
	}

	public getBundle = () => {
		const { bundleName, staticDir } = this
		const fileNames = fs.readdirSync(staticDir)
		const query = new RegExp(`${bundleName}.*.js`)
		const file = fileNames.filter(file => file.match(query))
		const hasFile = file !== null
		if (hasFile) return file[0]
		return null
	}

	public simpleFetch = async (url: string) => {
		const _response = await axios.get(url)
		const data = _response.data
		return data
	}

	public getReaderView = async (url: string) => {
		const _response = await this.simpleFetch(url),
			htmlString = _response,
			{ JSDOM } = jsdom,
			{ Readability } = readability,
			dom = new JSDOM(htmlString),
			window = dom.window,
			document = window.document,
			rawArticle = new Readability(document),
			article = rawArticle.parse()
		return article
	}
}
