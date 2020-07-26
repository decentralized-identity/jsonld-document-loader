import * as errors from '../errors';
import { IDocumentLoaderResponse } from '../types';

import { staticContextMap } from '../staticContexts';

export { staticContextMap };

export const documentLoader = async (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  let document = staticContextMap[uri] ? staticContextMap[uri] : null;
  if (document !== null) {
    return {
      contextUrl: null,
      documentUrl: uri,
      document: JSON.stringify(document),
    };
  }
  throw new errors.UnsupportedUri(`No context support for ${uri}`);
};
