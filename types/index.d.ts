export type MatchDetails = {
    params: object,
    query: object,
    search: string,
    hash: string,
    request: Request
};

export type Handler = (details: MatchDetails) => any | undefined;

export type Router = {

    get(pattern: string, handler: Handler): Router,
    put(pattern: string, handler: Handler): Router,
    post(pattern: string, handler: Handler): Router,
    patch(pattern: string, handler: Handler): Router,
    delete(pattern: string, handler: Handler): Router,
    head(pattern: string, handler: Handler): Router,
    connect(pattern: string, handler: Handler): Router,
    options(pattern: string, handler: Handler): Router,
    trace(pattern: string, handler: Handler): Router,

    resolve(request: Request | URL | string, origin: string | undefined): any | undefined,
    fallback(handler: Handler): any | undefined
};

export type RouterConnection = {
    disconnect(): void,
    navigate(url: string): void,
    back(): void
};

export declare function createRouter(): Router;
export declare function bindHistoryAPI(router: Router): RouterConnection;
