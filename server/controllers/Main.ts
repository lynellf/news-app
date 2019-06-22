import fs from 'fs'
import { IMain } from '../types/controllers/index'

export default class Main implements IMain {
    staticDir = ''
    bundleName = ''
    port = 9000
    constructor(config: TConfig) {
        const { staticDir, bundleName, port } = config
        this.staticDir = staticDir
        this.bundleName = bundleName
        this.port = parseInt(port)
    }

    getBundle () {
        const { bundleName, staticDir } = this
        const fileNames = fs.readdirSync(staticDir)
        const query = new RegExp(`${bundleName}.*.js`)
        const file = fileNames.filter(file => file.match(query))
        const hasFile = file !== null
        if (hasFile) return file[0]
        return null
    }
}

type TConfig = {
    staticDir: string
    bundleName: string
    port: string
}