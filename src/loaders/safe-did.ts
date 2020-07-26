import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';

import { didKey } from '../resolvers';

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let didDocument = null;

  const method = uri.split(':')[1];

  switch (method) {
    case 'key': {
      try {
        didDocument = await didKey.resolve(uri);
      } catch (e) {
        console.error('did documentLoader failed on: ' + uri);
        console.error(e);
        throw new errors.UnresolvableDid(e.message);
      }
    }
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
