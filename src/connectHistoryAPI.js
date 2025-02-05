export default (router) => {
    const observer = new MutationObserver(mutations => {
        const title = mutations[0].target.innerText
        history.replaceState({}, title, location.href)
    })
    observer.observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    )
    const update = () => {
        router.resolve(location.href, location.origin)
    }
    window.addEventListener('popstate', update)
    const disconnect = () => {
        observer.disconnect()
        window.removeEventListener('popstate', update)
    }
    const navigate = href => {
        history.pushState({}, document.title, href)
        update()
    }
    const back = () => { history.back() }
    update()
    return { navigate, back, disconnect }
}
