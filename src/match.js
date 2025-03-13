import detailsFromUrl from './detailsFromUrl.js'

export default (pattern, url) => {
    const result = url.pathname.match(pattern)
    if (!result)
        return; // undefined
    return detailsFromUrl(url, { ...result.groups })
}
