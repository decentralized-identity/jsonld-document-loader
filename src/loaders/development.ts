import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';
import {
  documentLoader as immutableDocumentLoader,
  staticContextMap,
} from './immutable';
import { documentLoader as httpDocumentLoader } from './http';
import { documentLoader as didDocumentLoader } from './unsafe-did';

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let didDocument = null;

  if (staticContextMap[uri]) {
    return immutableDocumentLoader(uri);
  }

  const isDidUri = uri.split(':')[0] === 'did';
  const isHttp = uri.indexOf('http') === 0;

  if (isHttp) {
    return httpDocumentLoader(uri);
  }

  if (isDidUri) {
    return didDocumentLoader(uri);
  }

  if (didDocument !== null) {
    return {
      contextUrl: null,
      documentUrl: uri,
      document: JSON.stringify(didDocument),
    };
  }
  throw new errors.UnsupportedUri(`No context support for ${uri}`);
};
