import {
  contexts,
  resolvedContexts,
  dids,
  resolvedDids,
} from '../__fixtures__';

import { documentLoader } from './production';

console.error = () => {};

it('can immutable URLs', async () => {
  const result = await documentLoader(contexts.didCoreV1Context);
  expect(result).toEqual(resolvedContexts.didCoreV1Context);
});

it('fails to resolve public http URLs', async () => {
  expect.assertions(1);
  try {
    await documentLoader(contexts.activitystreams);
  } catch (e) {
    expect(e.message).toBe(
      'No context support for https://www.w3.org/ns/activitystreams'
    );
  }
});

it('can immutable dids', async () => {
  const result = await documentLoader(dids.didKey1);
  expect(result).toEqual(resolvedDids.didKey1);
});

it('fails to resolve public mutable DIDs', async () => {
  expect.assertions(1);
  try {
    await documentLoader(dids.didSov1);
  } catch (e) {
    expect(e.message).toBe(
      'No context support for did:sov:CYQLsccvwhMTowprMjGjQ6'
    );
  }
});
