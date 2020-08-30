import * as Factory from 'factory.ts';

import { IContextMap } from '../types';

interface IContextManager {
  contexts: IContextMap;
  addContext: (contextMap: IContextMap) => IContextManager;
}

const factoryDefaults: IContextManager = {
  contexts: {},
  addContext: function(contextMap: IContextMap): IContextManager {
    this.contexts = {
      ...this.contexts,
      ...contextMap,
    };
    return this;
  },
};

const pluginFactory = Factory.Sync.makeFactory<IContextManager>(
  factoryDefaults
);

const plugin = pluginFactory.build();

export { IContextManager, IContextMap, pluginFactory, factoryDefaults, plugin };
