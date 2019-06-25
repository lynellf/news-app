export interface IMain {
    bundleName: string
    // getBundle: () => string | null
    googleAPIKey: string
    googleCX: string
    newsAPIKey: string
    port: number
    sources: TSources
    staticDir: string
}

export type TSources = {
    [source: string]: string[]
 }

export type TConfig = {
    bundleName: string
    googleAPIKey: string
    googleCX: string
    newsAPIKey: string
    port: string
    sources: TSources
    staticDir: string
}