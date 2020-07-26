import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';

const jsonld = require('jsonld');

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let result = null;
  try {
    result = await jsonld.documentLoader(uri);
  } catch (e) {
    console.error('default jsonld documentLoader failed on: ' + uri);
    console.error(e);
    throw new errors.UnresolvableContext(e.message);
  }
  if (result !== null) {
    return result;
  }
  throw new errors.UnsupportedUri(`No context support for ${uri}`);
};
