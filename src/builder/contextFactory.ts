import * as Factory from 'factory.ts';

import { IContextManager, IContextMap } from '../types';

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

export { factoryDefaults, pluginFactory, plugin };
