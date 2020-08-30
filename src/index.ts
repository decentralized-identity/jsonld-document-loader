import {
  DocumentLoaderManager,
  factoryDefaults,
  pluginFactory,
  plugin,
} from './builder';

import * as contexts from './contexts';
import * as types from './types';

const golemFactory = pluginFactory;

export {
  DocumentLoaderManager,
  pluginFactory,
  factoryDefaults,
  plugin,
  golemFactory,
  contexts,
  types,
};
