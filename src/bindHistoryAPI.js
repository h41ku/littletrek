export default (router) => {
    const observer = new MutationObserver(mutations => {
        const title = mutations[0].target.innerText
        history.replaceState({}, title, location.href)
    })
    const update = () => {
        router.resolve(location.href, location.origin)
    }
    const disconnect = () => {
        observer.disconnect()
        window.removeEventListener('popstate', update)
    }
    const navigate = href => {
        history.pushState({}, document.title, href)
        update()
    }
    const back = () => { history.back() }
    const connect = () => {
        observer.observe(
            document.querySelector('title'),
            { subtree: true, characterData: true, childList: true }
        )
        window.addEventListener('popstate', update)
        update()
    }
    return { navigate, back, connect, disconnect }
}
