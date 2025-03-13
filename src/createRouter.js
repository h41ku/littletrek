import createPattern from './createPattern.js'
import match from './match.js'
import detailsFromUrl from './detailsFromUrl.js'

export default () => {
    const maps = new Map()
    const getMap = method => {
        let map = maps.get(method)
        if (!map) {
            map = new Map()
            maps.set(method, map)
        }
        return map
    }
    let router
    let fallback = () => {}
    const roadmap = (method) => (pattern, action) => {
        getMap(method).set(createPattern(pattern), { pattern, action })
        return router
    }
    const resolve = (request, origin) => { // `origin` is undefined by default
        if (!(request instanceof Request))
            request = new Request(
                request instanceof URL
                    ? request
                    : new URL(request, origin)
            )
        const { method, url: href } = request
        const url = new URL(href)
        for (const [ regexp, { action } ] of getMap(method)) {
            const details = match(regexp, url)
            if (details)
                return action({ ...details, request })
        }
        return fallback({ ...detailsFromUrl(url), request })
    }
    return (router = {
        get: roadmap('GET'),
        put: roadmap('PUT'),
        post: roadmap('POST'),
        delete: roadmap('DELETE'),
        patch: roadmap('PATCH'),
        head: roadmap('HEAD'),
        connect: roadmap('CONNECT'),
        options: roadmap('OPTIONS'),
        trace: roadmap('TRACE'),
        resolve,
        fallback: handler => { fallback = handler }
    })
}
