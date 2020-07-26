// more safe
export * as immutable from './loaders/immutable'
export * as safeDid from './loaders/safe-did'
export * as production from './loaders/production'

// less safe
export * as http from './loaders/http'
export * as unsafeDid from './loaders/unsafe-did'
export * as development from './loaders/development'

export * from './types'
export * from './staticContexts'