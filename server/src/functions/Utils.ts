export default class Utils {
    public getPort() {
        const port = localStorage.getItem('port')
        return port
    }
}