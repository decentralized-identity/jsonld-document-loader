import { IContextMap } from '../../types';
import W3C_DID_CORE_V1 from './did-v1.json';

const W3C_DID_CORE_URL_V1 = 'https://www.w3.org/ns/did/v1';

const W3C_Decentralized_Identifiers: IContextMap = {
  [W3C_DID_CORE_URL_V1]: W3C_DID_CORE_V1,
};

export { W3C_Decentralized_Identifiers };
