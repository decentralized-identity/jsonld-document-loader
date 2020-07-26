import {
  contexts,
  resolvedContexts,
  dids,
  resolvedDids,
} from '../__fixtures__';

import { documentLoader } from './development';

console.error = () => {};

it('can resolve public URLs', async () => {
  const result = await documentLoader(contexts.activitystreams);
  expect(result).toEqual(resolvedContexts.activitystreams);
});

it('can resolve public mutable DIDs', async () => {
  const result = await documentLoader(dids.didSov1);
  expect(result).toEqual(resolvedDids.didSov1);
});
