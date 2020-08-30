import { IContextMap } from '../../types';

import W3C_ODRL from './odrl.json';

export const W3C_ODRL_URL = 'https://www.w3.org/ns/odrl.jsonld';

const W3C_Open_Digital_Rights_Langauge: IContextMap = {
  [W3C_ODRL_URL]: W3C_ODRL,
};

export { W3C_Open_Digital_Rights_Langauge };
