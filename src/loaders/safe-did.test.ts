import { dids, resolvedDids } from '../__fixtures__';

import { documentLoader } from './safe-did';

console.error = () => {};

it('can resolve valid did:key', async () => {
  const result = await documentLoader(dids.didKey1);
  expect(result).toEqual(resolvedDids.didKey1);
});

it('fails with error on invalid did:key', async () => {
  expect.assertions(1);
  const brokeDid = dids.didKey1.substr(0, 24);
  try {
    await documentLoader(brokeDid);
  } catch (e) {
    expect(e.message).toBe(`UnresolvableDid -> ${brokeDid}`);
  }
});
