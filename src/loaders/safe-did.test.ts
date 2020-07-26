import { dids, resolvedDids } from '../__fixtures__';

import { documentLoader } from './safe-did';

console.error = () => {};

it('can resolve valid did:key', async () => {
  const result = await documentLoader(dids.didKey1);
  expect(result).toEqual(resolvedDids.didKey1);
});

it('fails with error on invalid did:key', async () => {
  expect.assertions(1);
  try {
    await documentLoader(dids.didKey1.substr(0, 24));
  } catch (e) {
    expect(e.message).toBe(
      'UnresolvableDid -> Unsupported Fingerprint Type: z6Mkf5rGMoatrSj1'
    );
  }
});
