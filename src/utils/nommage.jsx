export const nommage = (string, maxChar) => {
    if(string.length > maxChar){
        let ret = string.slice(0, maxChar)
        ret = ret + '...'
        return ret
    }
    else return string
}