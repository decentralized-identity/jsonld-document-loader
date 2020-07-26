import { IContextMap } from './types';

const staticContextMap: IContextMap = {
  'https://www.w3.org/ns/did/v1': require('./contexts/did-v1.json'),
  'https://www.w3.org/2018/credentials/v1': require('./contexts/vc-v1.json'),
  'https://www.w3.org/2018/credentials/examples/v1': require('./contexts/vc-example-v1.json'),
  'https://www.w3.org/ns/odrl.jsonld': require('./contexts/odrl.json'),
};

const staticContextUris = Object.keys(staticContextMap);

export { staticContextUris, staticContextMap };
