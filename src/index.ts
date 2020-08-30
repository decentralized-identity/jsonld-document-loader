import * as contexts from './contexts';
import * as types from './types';

import {
  contextFactory,
  resolverFactory,
  documentLoaderFactory,
} from './builder';

const golem = documentLoaderFactory.pluginFactory;

export {
  golem,
  contextFactory,
  resolverFactory,
  documentLoaderFactory,
  contexts,
  types,
};
