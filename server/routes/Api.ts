import express from 'express'
import News from '../controllers/News'

const Api = express.Router()
const controller = new News()

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

export default Api
