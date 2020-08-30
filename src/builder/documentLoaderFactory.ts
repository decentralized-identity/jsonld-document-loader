import * as types from '../types';

import * as Factory from 'factory.ts';
import * as ContextFactory from './contextFactory';
import * as ResolverFactory from './resolverFactory';

interface IDocumentLoaderResponse {
  contextUrl: string | null;
  documentUrl: string;
  document: string;
}

interface DocumentLoaderManager
  extends ContextFactory.IContextManager,
    ResolverFactory.IResolverManager {
  documentLoader: (uri: string) => Promise<IDocumentLoaderResponse>;
  addContext: (contextMap: ContextFactory.IContextMap) => DocumentLoaderManager;
  addResolver: (
    startWithResolverMap: ResolverFactory.IStartsWithResolver
  ) => DocumentLoaderManager;
  buildDocumentLoader: () => types.DocumentLoader;
}

const factoryDefaults = {
  ...ContextFactory.factoryDefaults,
  ...ResolverFactory.factoryDefaults,
  documentLoader: async function(uri: string) {
    let matchingResolver = this.hasResolverForUri(uri);
    if (matchingResolver) {
      const doc = await matchingResolver.resolve(uri);
      return Promise.resolve({
        contextUrl: null,
        documentUrl: uri,
        document: doc,
      });
    }

    if (this.contexts[uri]) {
      const context = this.contexts[uri];
      return Promise.resolve({
        contextUrl: null,
        documentUrl: uri,
        document: JSON.stringify(context),
      });
    }
    // leave uncommented.
    console.error('documentLoader called on unsupported URI ' + uri);
    throw new Error('documentLoader called on unsupported URI ' + uri);
  },
  buildDocumentLoader: function() {
    return (uri: string) => {
      return this.documentLoader(uri);
    };
  },
} as DocumentLoaderManager;

const pluginFactory = Factory.Sync.makeFactory<DocumentLoaderManager>(
  factoryDefaults
)
  .combine(ContextFactory.pluginFactory)
  .combine(ResolverFactory.pluginFactory);

const plugin = pluginFactory.build();

export {
  DocumentLoaderManager,
  IDocumentLoaderResponse,
  pluginFactory,
  factoryDefaults,
  plugin,
};
