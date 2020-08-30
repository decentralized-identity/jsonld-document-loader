export interface IContextMap {
  [key: string]: any;
}

export interface IDocumentLoaderResponse {
  contextUrl: string | null;
  documentUrl: string;
  document: string;
}

export type DocumentLoader = (uri: string) => Promise<IDocumentLoaderResponse>;
