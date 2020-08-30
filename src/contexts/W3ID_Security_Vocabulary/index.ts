import { IContextMap } from '../../types';

import W3ID_SEC_V1 from './sec-v1.json';
import W3ID_SEC_V2 from './sec-v2.json';

const W3ID_SEC_URL_V1 = 'https://w3id.org/security/v1';
const W3ID_SEC_URL_V2 = 'https://w3id.org/security/v2';

const W3ID_Security_Vocabulary: IContextMap = {
  [W3ID_SEC_URL_V1]: W3ID_SEC_V1,
  [W3ID_SEC_URL_V2]: W3ID_SEC_V2,
};

export { W3ID_Security_Vocabulary };
