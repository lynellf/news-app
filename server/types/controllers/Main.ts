export interface IMain {
    [key: string]: TMain
    bundleName: string
    getBundle: () => string | null
    googleAPIKey: string
    googleCX: string
    newsAPIKey: string
    port: number
    sources: TSources
    staticDir: string
}

export type TSetValue = { config: TConfig; key: string; context: IMain; }

export type TFunction = () => string | null

export type TMain = string | number | TSources | string[] | TFunction;

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

// export type TConfig = { [key: string]: string | number | TSources | string[] }