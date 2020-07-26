import { production, IDocumentLoaderResponse, development } from '../index';
import { dids, resolvedDids } from '../__fixtures__';

const myNewProductionLoader = (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  if (uri.indexOf('did:sov') === 0) {
    // handle your URIs first.
    return development.documentLoader(uri);
  }
  return production.documentLoader(uri);
};

it('can can handle public mutable dids when extended', async () => {
  const result = await myNewProductionLoader(dids.didSov1);
  expect(result).toEqual(resolvedDids.didSov1);
});
