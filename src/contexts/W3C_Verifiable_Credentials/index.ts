import { IContextMap } from '../../types';

import W3C_VC_DATA_MODEL_V1 from './vc-v1.json';
import W3C_VC_DATA_MODEL_EXAMPLES_V1 from './vc-example-v1.json';
// W3C_Open_Digital_Rights_Langauge is required by W3C_VC_DATA_MODEL_EXAMPLES_V1
import { W3C_Open_Digital_Rights_Langauge } from '../W3C_Open_Digital_Rights_Langauge';

const W3C_VC_DATA_MODEL_URL_V1 = 'https://www.w3.org/2018/credentials/v1';
const W3C_VC_DATA_MODEL_EXAMPLES_URL_V1 =
  'https://www.w3.org/2018/credentials/examples/v1';

const W3C_Verifiable_Credentials: IContextMap = {
  [W3C_VC_DATA_MODEL_URL_V1]: W3C_VC_DATA_MODEL_V1,
  [W3C_VC_DATA_MODEL_EXAMPLES_URL_V1]: W3C_VC_DATA_MODEL_EXAMPLES_V1,
  ...W3C_Open_Digital_Rights_Langauge,
};

export { W3C_Verifiable_Credentials };
