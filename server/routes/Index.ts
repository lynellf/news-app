import express from 'express'
import Application from '../controllers/Application'
import config from '../config.json'

const Index = express.Router();
const controller = new Application(config)

Index.get('*', (req, res) => controller.handleRoot(req, res));

export default Index;