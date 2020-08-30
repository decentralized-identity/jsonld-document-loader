import { pluginFactory } from './resolverFactory';

it('can build a resolver manager with defaults', async () => {
  const manager = pluginFactory.build({
    resolvers: {
      ['did:foo']: {
        resolve: (did: string) => {
          return Promise.resolve({ id: did });
        },
      },
    },
  });
  expect(Object.keys(manager.resolvers).length).toBe(1);
});

it('can add a resolver', async () => {
  expect.assertions(5);
  const manager = pluginFactory.build();
  manager.addResolver({
    ['did:foo']: {
      resolve: (did: string) => {
        return Promise.resolve({ id: did });
      },
    },
  });
  expect(Object.keys(manager.resolvers).length).toBe(1);
  let result = await manager.resolve('did:foo:123');
  expect(result).toEqual({ id: 'did:foo:123' });
  try {
    await manager.resolve('did:bar:123');
  } catch (e) {
    expect(e.message).toBe('Resolve called on unsupported URI did:bar:123');
  }
  manager.addResolver({
    ['did:bar']: {
      resolve: (did: string) => {
        return Promise.resolve({ id: did });
      },
    },
  });
  expect(Object.keys(manager.resolvers).length).toBe(2);
  result = await manager.resolve('did:bar:123');
  expect(result).toEqual({ id: 'did:bar:123' });
});
