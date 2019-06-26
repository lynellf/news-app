import fs from 'fs'
import axios from 'axios'
import { TSources } from '../types/controllers/Main'
import config from '../config.json'

export default class Main {
    public bundleName = 'bundle'
    public googleAPIKey = ''
    public googleCX = ''
    public newsAPIKey = ''
    public port = 9000
    public sources: TSources = { 
        generalNews: [],
        techNews: [],
        queries: []
    }
    public staticDir = 'server/public'
    
    constructor() {
        this.bundleName = config.bundleName
        this.googleAPIKey = config.googleAPIKey
        this.googleCX = config.googleCX
        this.newsAPIKey = config.newsAPIKey
        this.port = parseInt(config.port)
        this.sources = { ...config.sources }
        this.staticDir = config.staticDir
    }

    static getBundle () {
        const { bundleName, staticDir } = new Main()
        const fileNames = fs.readdirSync(staticDir)
        const query = new RegExp(`${bundleName}.*.js`)
        const file = fileNames.filter(file => file.match(query))
        const hasFile = file !== null
        if (hasFile) return file[0]
        return null
    }

    static async simpleFetch(url: string) {
        const _response = await axios.get(url)
        const data = _response.data
        return data
    }
}

export const getBundle = Main.getBundle
export const simpleFetch = Main.simpleFetch