const jsonld = require('jsonld');

import { contexts, resolvedContexts } from '../__fixtures__';

it('can use jsonld.js documentLoader', async () => {
  const result = await jsonld.documentLoader(contexts.activitystreams);
  expect(result).toEqual(resolvedContexts.activitystreams);
});
