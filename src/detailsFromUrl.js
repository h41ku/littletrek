export default (url, params = {}) => {
    const { search, hash } = url
    const query = Object.fromEntries(new URLSearchParams(search))
    return { params, query, hash }
}