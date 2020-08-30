import * as Factory from 'factory.ts';

import { IResolverManager, IStartsWithResolver, IResolver } from '../types';

const factoryDefaults: IResolverManager = {
  resolvers: {},
  addResolver: function(
    startsWithResolverMap: IStartsWithResolver
  ): IResolverManager {
    this.resolvers = {
      ...this.resolvers,
      ...startsWithResolverMap,
    };
    return this;
  },
  hasResolverForUri: function(uri: string) {
    let matchingResolver = undefined;
    Object.keys(this.resolvers).forEach(startWith => {
      if (uri.indexOf(startWith) === 0) {
        matchingResolver = this.resolvers[startWith];
      }
    });
    return matchingResolver;
  },
  resolve: function(uri: string) {
    let matchingResolver = this.hasResolverForUri(uri);
    if (matchingResolver) {
      return (matchingResolver as IResolver).resolve(uri);
    }
    // console.error('Resolve called on unsupported URI ' + uri);
    throw new Error('Resolve called on unsupported URI ' + uri);
  },
};

const pluginFactory = Factory.Sync.makeFactory<IResolverManager>(
  factoryDefaults
);

const plugin = pluginFactory.build();

export { factoryDefaults, pluginFactory, plugin };
