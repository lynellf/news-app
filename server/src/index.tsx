import * as React from 'react';
import { hydrate } from 'react-dom'
import App from './views/App'

const rootNode = document.querySelector('#root')

hydrate(<App />, rootNode)