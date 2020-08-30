import { pluginFactory } from './documentLoaderFactory';
import * as contexts from '../contexts';

it('can build a documentLoader manager with defaults', async () => {
  const manager = pluginFactory.build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
    },
    resolvers: {
      ['did:foo']: {
        resolve: (did: string) => {
          return Promise.resolve({ id: did });
        },
      },
    },
  });
  expect(Object.keys(manager.contexts).length).toBe(1);
  expect(Object.keys(manager.resolvers).length).toBe(1);
  expect(manager.addContext).toBeDefined();
  expect(manager.addResolver).toBeDefined();
});

it('can add a contexts and resolvers', async () => {
  const manager = pluginFactory.build();
  manager.addContext(contexts.W3C_Decentralized_Identifiers);
  manager.addResolver({
    ['did:bar']: {
      resolve: (did: string) => {
        return Promise.resolve({ id: did });
      },
    },
  });
  expect(Object.keys(manager.contexts).length).toBe(1);
  expect(Object.keys(manager.resolvers).length).toBe(1);
});

it('can use documentLoader to resolve contexts and did documents', async () => {
  const manager = pluginFactory.build();

  manager.addContext(contexts.W3C_Decentralized_Identifiers);
  manager.addResolver({
    ['did:bar']: {
      resolve: (did: string) => {
        return Promise.resolve({ id: did });
      },
    },
  });

  let result = await manager.documentLoader('https://www.w3.org/ns/did/v1');
  expect(result.document.indexOf('{"@context":{"@version":1.1')).toBe(0);
  result = await manager.documentLoader('did:bar:456');
  expect(result.document).toEqual({ id: 'did:bar:456' });
});

let manager = pluginFactory.build({
  contexts: {
    ...contexts.W3C_Verifiable_Credentials,
  },
});

it('can build externally', async () => {
  manager.addContext(contexts.W3C_Decentralized_Identifiers);
  let result = await manager.documentLoader('https://www.w3.org/ns/did/v1');
  expect(result.document.indexOf('{"@context":{"@version":1.1')).toBe(0);
  expect(Object.keys(manager.contexts).length).toBe(4);
});
