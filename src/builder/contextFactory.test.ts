import { pluginFactory } from './contextFactory';
import * as contexts from '../contexts';

it('can build a context manager with defaults', async () => {
  const manager = pluginFactory.build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
    },
  });
  expect(Object.keys(manager.contexts).length).toBe(1);
});

it('can add a context', async () => {
  const manager = pluginFactory.build();
  manager.addContext(contexts.W3C_Decentralized_Identifiers);
  expect(Object.keys(manager.contexts).length).toBe(1);
  manager.addContext(contexts.W3C_Verifiable_Credentials);
  expect(Object.keys(manager.contexts).length).toBe(4);
});
