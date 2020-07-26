import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';

import { documentLoader as safeDidDocumentLoader } from './safe-did';

import { universalResolver } from '../resolvers';

const safeDidMethods = ['key'];

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let didDocument = null;

  const method = uri.split(':')[1];

  if (safeDidMethods.indexOf(method) !== -1) {
    return safeDidDocumentLoader(uri);
  }

  try {
    didDocument = await universalResolver.resolve(uri);
  } catch (e) {
    console.error('universalResolver documentLoader failed on: ' + uri);
    console.error(e);
    throw new errors.UnresolvableDid(e.message);
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
