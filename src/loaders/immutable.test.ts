import { staticContextUris, staticContextMap } from '../__fixtures__';

import { documentLoader } from './immutable';

console.error = () => {};

staticContextUris.forEach((staticUri: string) => {
  it(staticUri, async () => {
    const result = await documentLoader(staticUri);
    expect(JSON.parse(result.document)).toEqual(staticContextMap[staticUri]);
  });
});
