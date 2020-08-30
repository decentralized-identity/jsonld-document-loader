#### @transmute/jsonld-document-loader

Working with untrusted data on the internet is dangerous.

Document loaders enable decentralized security, interoperability and extensibility while gaurding against vendor lock in.

In the linked data community, one mechanism for bridging vendor networks such as permissioned IPFS and Hyperledger Indy is to expose resources on both networks through a common interface.

This module helps you build a common interface to multiple networks easily.

```
npm i @transmute/jsonld-document-loader --save
```

### Usage

```ts
import { golem, contexts } from '@transmute/jsonld-document-loader';
// import resolvers, ipfs, etc... then attach them to the document loader.
const axios = require('axios');

const documentLoader = golem
  .build({
    contexts: {
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary,
    },
  })
  .addContext(contexts.W3C_Decentralized_Identifiers)
  .addResolver({
    ['did:bar']: {
      resolve: (did: string) => {
        return Promise.resolve({ id: did });
      },
    },
  })
  .addResolver({
    ['Qm']: {
      resolve: (cid: string) => {
        const resp = await axios.get(`https://ipfs.io/ipfs/${cid}`);
        // transform ipfs data here...
        // return a JSON Object / String / CBOR
        return Promise.resolve(resp.data);
      },
    },
  })

  .buildDocumentLoader();

let result;

result = await documentLoader(
  'https://ipfs.io/ipfs/QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5'
);
// {
//   "contextUrl": null,
//   "documentUrl": "https://ipfs.io/ipfs/QmUQAxKQ5sbWWrcBZzwkThktfUGZvuPQyTrqMzb3mZnLE5",
//   "document": "<?xml version=\"1.0\" encoding=\"UTF-8\"..."
// }

result = await documentLoader('https://www.w3.org/ns/did/v1');
// {
//   "contextUrl": null,
//   "documentUrl": "did:bar:123",
//   "document": "{\"@context\":{\"@version\":1.1..."
// }

result = await documentLoader('did:bar:123');
// {
//   "contextUrl": null,
//   "documentUrl": "did:bar:123",
//   "document": "{ id: 'did:bar:123' }"
// }
```

### Privacy & Security Considerations

In production, you should only process data your system is designed to handle.

By default, this library supports a production `documentLoader` that only returns immutable content.

You can extend this `documentLoader` to support mutable content, but be careful, doing so may introduce data that you were not expecting into your system...

It's your responsibility to sanitize and validate data before handling it or passing it to other internal software...

If you are unfamilar with the concept of input validation... please don't use this software until you have read the [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

#### Do I need to download random remote contexts?

NO! In production, you should never process ANY DATA, which your application was not designed for.... an obvious example of this XSS sanitization, which ensures that strings don't contain script tags... failure to do this can allow an attacker to exploit your web applications and attack your users...

Please review the [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

#### Why are context's necessary for JSON-LD and CBOR-LD?

They are a mechanism for elegantly solving semantic disambuity, in a decentralized manner.

Consier how unreasonable it is to register all the concepts of agriculture, economics, cybersecurity, finance, healthcare and e-commerce in a centralized registry.

Yet, without agreeing to a common representation for semantic concepts, how can we have interoperability, extensability and security?

That's why linked data formats like JSON-LD and CBOR-LD are so valuable.

They solve this problem, without requiring you to forever be a customer of a particular vendor, by making the vendor's data portable and interoperable outside of the software which created it...

Don't be suprised if you see Linked Data hater's in the wild...

Massive corporations that have aquired large amounts of private user and corporate information are trying hard to prevent users from leaving centralized platforms with semantically unambigious copies of _their own_ data!
