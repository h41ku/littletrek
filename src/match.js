export default (pattern, url) => {
    const result = url.pathname.match(pattern)
    if (!result)
        return; // undefined
    const { search, hash } = url
    const params = { ...result.groups }
    const query = Object.fromEntries(new URLSearchParams(search))
    return { params, query, hash }
}
