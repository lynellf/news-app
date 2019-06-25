import fs from 'fs'
import axios from 'axios'
import { IMain, TConfig, TSources } from '../types/controllers/Main'
import config from '../config.json'

export default class Main implements IMain {
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
    public staticDir = '/server/public'
    
    constructor(config: TConfig) {
        const {
            bundleName,
            googleAPIKey,
            googleCX,
            newsAPIKey,
            port,
            sources,
            staticDir
        } = config
        this.bundleName = bundleName ? bundleName : this.bundleName
        this.googleAPIKey = googleAPIKey ? googleAPIKey : this.googleAPIKey
        this.googleCX = googleCX ? googleCX : this.googleCX
        this.newsAPIKey = newsAPIKey ? newsAPIKey : this.newsAPIKey
        this.port = port ? parseInt(port) : this.port
        this.sources = sources ? sources : this.sources
        this.staticDir = staticDir ? staticDir : this.staticDir
    }

    static getBundle () {
        const { bundleName, staticDir } = new this(config)
        const fileNames = fs.readdirSync(staticDir)
        const query = new RegExp(`${bundleName}.*.js`)
        const file = fileNames.filter(file => file.match(query))
        const hasFile = file !== null
        if (hasFile) return file[0]
        return 'null'
    }

    static async simpleFetch(url: string) {
        const _response = await axios.get(url)
        const data = _response.data
        return data
    }
}

export const getBundle = Main.getBundle
export const simpleFetch = Main.simpleFetch