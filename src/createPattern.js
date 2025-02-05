const regex = /(?:\/((?:\:[a-zA-Z0-9_][a-zA-Z0-9_]*)|[a-zA-Z0-9._-]+|\*))|./g
const sanity = target => target.replaceAll('-', "\\-").replaceAll('.', "\\.")
export default path => {
    if (path === '/')
        return /^\/$/
    const pattern = []
    let result
    while (result = regex.exec(path)) {
        const { 0: match, 1: target, index } = result
        if (target === undefined) {
            throw new SyntaxError([
                `Unexpected symbol '${match}' at position ${index}:\n`,
                `Route: ${path}\n`,
                `Error: ${''.padStart(index,' ')+'^-- here'}\n`
            ].join(''))
        }
        pattern.push(
            target.charAt(0) === ':' // is parameter
                ? `(?<${target.substring(1)}>[^/]+)`
                : (target === '*' ? '[^/]+' : sanity(target))
        )
    }
    return new RegExp("^\\/" + pattern.join("\\/") + "\\/?$")
}
