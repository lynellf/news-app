import express from 'express'
import AppController from '../controllers/AppController'

const Index = express.Router()
const controller = new AppController()

Index.get('/', (req, res) => {
	console.log('main endpoint called')
	controller.handleRoot(req, res)
})

export default Index
