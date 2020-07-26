import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';
import {
  documentLoader as immutableDocumentLoader,
  staticContextMap,
} from './immutable';

import { documentLoader as didDocumentLoader } from './safe-did';

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let didDocument = null;

  if (staticContextMap[uri]) {
    return immutableDocumentLoader(uri);
  }

  const isDidUri = uri.split(':')[0] === 'did';

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
