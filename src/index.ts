// more safe
import * as immutable from './loaders/immutable';
import * as safeDid from './loaders/safe-did';
import * as production from './loaders/production';

// less safe
import * as http from './loaders/http';
import * as unsafeDid from './loaders/unsafe-did';
import * as development from './loaders/development';

export { immutable, safeDid, production, http, unsafeDid, development };

export * from './types';
export * from './staticContexts';
