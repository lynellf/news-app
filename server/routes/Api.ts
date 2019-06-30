import express from 'express'
import NewsController from '../controllers/NewsController'

const Api = express.Router()
const controller = new NewsController()

Api.get('/headlines/:category', (req, res) => {
	const category = req.params['category']
	controller.getHeadlines(category, res)
})

Api.get('/search/:query', (req, res) => {
	const query = req.params['query']
	controller.getSearch(query, res)
})

Api.get('/youtube/:query', (req, res) => {
	const query = req.params['query']
	controller.getYouTube(query, res)
})

Api.get('/all', (_req, res) => {
	controller.getNews(res)
})

Api.post('/simple', (req, res) => controller.parseArticle(req, res))

export default Api
