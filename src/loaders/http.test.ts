import { contexts, resolvedContexts } from '../__fixtures__';

import { documentLoader } from './http';

console.error = () => {};

it('can resolve public URLs', async () => {
  const result = await documentLoader(contexts.activitystreams);
  expect(result).toEqual(resolvedContexts.activitystreams);
});

it('can fails to resolve private URLS', async () => {
  expect.assertions(1);
  try {
    await documentLoader(contexts.unresolveable);
  } catch (e) {
    expect(e.message).toBe(
      'URL "https://example.com/proprietary/vendor/lock/v1" could not be dereferenced: Not Found'
    );
  }
});
