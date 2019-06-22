import Main from './Main'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/views/App'
import { TRenderRoot } from '../types/controllers/TRenderRoot';
import { Request } from 'express-serve-static-core';

export default class Application extends Main {
    handleRoot(_req: Request, res: TRenderRoot) {
        const { port } = this
        const jsBundle = this.getBundle()
        const application = ReactDOMServer.renderToString(<App />)
        res.render('index', { application, jsBundle, port })
    }
}

