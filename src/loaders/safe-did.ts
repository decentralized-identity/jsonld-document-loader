import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';

import { didKey } from '../resolvers';

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let didDocument = null;

  const _uri = uri.split('#')[0];

  const method = _uri.split(':')[1];

  switch (method) {
    case 'key': {
      try {
        didDocument = await didKey.resolve(_uri);
      } catch (e) {
        console.error('did documentLoader failed on: ' + _uri);
        console.error(e);
        throw new errors.UnresolvableDid(_uri);
      }
    }
  }

  if (didDocument !== null) {
    return {
      contextUrl: null,
      documentUrl: _uri,
      document: JSON.stringify(didDocument),
    };
  }
  throw new errors.UnsupportedUri(`No support for ${_uri}`);
};
