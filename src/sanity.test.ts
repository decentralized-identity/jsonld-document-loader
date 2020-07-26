import * as documentLoader from './index';

it('http documentLoader exists', async () => {
  expect(documentLoader.http).toBeDefined();
});

it('safeDid documentLoader exists', async () => {
  expect(documentLoader.safeDid).toBeDefined();
});

it('unsafeDid documentLoader exists', async () => {
  expect(documentLoader.unsafeDid).toBeDefined();
});

it('did documentLoader exists', async () => {
  expect(documentLoader.immutable).toBeDefined();
});
