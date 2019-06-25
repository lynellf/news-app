import express from 'express'
import News from '../controllers/News'
import config from '../config.json'

const Api = express.Router();
const controller = new News(config)

Api.get('/headlines/:category', (req, res) =>  {
  console.log('headlines endpoint called')
  const category = req.params['category']
  controller.getHeadlines(category, res)
});

Api.get('/search/:query', (req, res) =>  {
  console.log({ params: req.params })
  const query = req.params['query']
  console.log('search endpoint called')
  controller.getSearch(query, res)
});

Api.get('/youtube/:query', (req, res) =>  {
  console.log({ params: req.params })
  const query = req.params['query']
  console.log('youtube endpoint called')
  controller.getYouTube(query, res)
});

export default Api;