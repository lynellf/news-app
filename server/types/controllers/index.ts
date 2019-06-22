export interface IMain {
    staticDir: string
    bundleName: string
    port: number
    getBundle: () => string | null
}