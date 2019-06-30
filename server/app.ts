import express from 'express'
import http from 'http'
import logger from 'morgan'
import Index from './routes/Index'
import Api from './routes/Api'
import config from './config.json'
import bodyParser from 'body-parser'

const server = express()
const port =
	config.port ? parseInt(config.port) :
	9000
const expressServer = http.createServer(server)

server.use(bodyParser())
server.use(logger('dev'))
server.set('views', 'server/views')
server.set('view engine', 'pug')
server.use(express.static('server/public'))

server.use('/', Index)
server.use('/api', Api)

expressServer.listen(port, () => {
	console.log(`Express Server Initalized on port ${port}.`)
})
