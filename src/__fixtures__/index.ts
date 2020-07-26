import { staticContextUris, staticContextMap } from '../staticContexts';

const didCoreV1Context = 'https://www.w3.org/ns/did/v1';
const activitystreams = 'https://www.w3.org/ns/activitystreams';
const unresolveable = 'https://example.com/proprietary/vendor/lock/v1';

const didKey1 = 'did:key:z6Mkf5rGMoatrSj1f4CyvuHBeXJELe9RPdzo2PKGNCKVtZxP';
const didSov1 = 'did:sov:CYQLsccvwhMTowprMjGjQ6';

const dids = {
  didKey1,
  didSov1,
};

const contexts = {
  unresolveable,
  activitystreams,
  didCoreV1Context,
};

const resolvedContexts = {
  activitystreams: require('./resolved/activitystreams.json'),
  didCoreV1Context: require('./resolved/didCoreV1Context.json'),
};

const resolvedDids = {
  didKey1: require('./resolved/didKey1.json'),
  didSov1: require('./resolved/didSov1.json'),
};

export {
  contexts,
  resolvedContexts,
  dids,
  resolvedDids,
  staticContextUris,
  staticContextMap,
};
