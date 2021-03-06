import Main from './MainController'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/views/App'
import { TRenderRoot } from '../types/controllers/Application'
import { Request } from 'express-serve-static-core'

export default class AppController extends Main {
	handleRoot(_req: Request, res: TRenderRoot) {
		const { getBundle, port } = this
		const jsBundle = getBundle()
		const application = ReactDOMServer.renderToString(<App />)
		res.render('index', { application, jsBundle, port })
	}
}
