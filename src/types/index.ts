export interface IContextManager {
  contexts: IContextMap;
  addContext: (contextMap: IContextMap) => IContextManager;
}

export interface IContextMap {
  [key: string]: any;
}

export interface IResolver {
  resolve: (uri: string) => Promise<any>;
}

export interface IStartsWithResolver {
  [startsWith: string]: IResolver;
}

export interface IResolverManager {
  resolvers: IStartsWithResolver;
  addResolver: (contextMap: IStartsWithResolver) => IResolverManager;
  hasResolverForUri: (uri: string) => IResolver | undefined;
  resolve: (uri: string) => Promise<any>;
}

export interface IDocumentLoaderResponse {
  contextUrl: string | null;
  documentUrl: string;
  document: string;
}

export type DocumentLoader = (uri: string) => Promise<IDocumentLoaderResponse>;

export interface DocumentLoaderManager
  extends IContextManager,
    IResolverManager {
  documentLoader: (uri: string) => Promise<IDocumentLoaderResponse>;
  addContext: (contextMap: IContextMap) => DocumentLoaderManager;
  addResolver: (
    startWithResolverMap: IStartsWithResolver
  ) => DocumentLoaderManager;
  buildDocumentLoader: () => DocumentLoader;
}

export interface IDocumentLoaderResponse {
  contextUrl: string | null;
  documentUrl: string;
  document: string;
}
