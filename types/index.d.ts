export type Request = { params: object, query: object, search: string, hash: string };
export type RequestHandler = (request: Request) => void;
export type Router = {
    add(pattern: string, handler: RequestHandler): Router,
    resolve(location: string | URL, origin: string | undefined): void
};
export type RouterConnection = {
    disconnect(): void,
    navigate(url: string): void,
    back(): void
};

export declare function createRouter(): Router;
export declare function bindHistoryAPI(router: Router): RouterConnection;
