import createPattern from './createPattern.js'
import match from './match.js'

export default () => {
    const roadmap = new Map()
    let router
    const add = (pattern, action) => {
        roadmap.set(createPattern(pattern), { pattern, action })
        return router
    }
    const resolve = (url, base) => { // `base` is undefined by default
        if (!(url instanceof URL))
            url = new URL(url, base)
        for (const [ regexp, { action } ] of roadmap) {
            const request = match(regexp, url)
            if (request)
                return action(request)
        }
    }
    return (router = { add, resolve })
}
