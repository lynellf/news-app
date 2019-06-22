import express from 'express'
import http from 'http'
import logger from 'morgan'
import Index from './routes/Index'

const server = express()
const port = 9000
const expressServer = http.createServer(server)

server.use(logger('dev'))
server.set('views', 'server/views')
server.set('view engine', 'pug')
server.use(express.static('server/public'))

server.use('/', Index)

expressServer.listen(port, () => {
    console.log(`Express Server Initalized on port ${port}.`)
})
