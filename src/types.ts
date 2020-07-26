export interface IContextMap {
  [key: string]: any;
}

export interface IDocumentLoaderResponse {
  contextUrl: string | null;
  documentUrl: string;
  document: string;
}
