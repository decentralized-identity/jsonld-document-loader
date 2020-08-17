import { contexts, resolvedContexts } from '../__fixtures__';

const jsonld = require('jsonld');

it('can use jsonld.js documentLoader', async () => {
  const result = await jsonld.documentLoader(contexts.activitystreams);
  expect(result).toEqual(resolvedContexts.activitystreams);
});
