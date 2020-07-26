# jsonld-document-loader

Working with untrusted data on the internet is dangerous.

Document loaders enable decentralized security, interoperability and extensibility while gaurding against vendor lock in.

```
npm i @transmute/jsonld-document-loader --save
```

### Usage

In production, you should only process data your system is designed to handle.

By default, this library supports a production `documentLoader` that only returns immutable content.

You can extend this `documentLoader` to support mutable content, but be careful, doing so may introduce data that you were not expecting into your system...

It's your responsibility to sanitize and validate data before handling it or passing it to other internal software...

If you are unfamilar with the concept of input validation... please don't use this software until you have read [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

```ts
import {
  production,
  IDocumentLoaderResponse,
  development,
} from '@transmute/jsonld-document-loader';

const myNewProductionLoader = (
  uri: string
): Promise<IDocumentLoaderResponse> => {
  if (uri.indexOf('did:sov') === 0) {
    // handle your URIs first.
    return development.documentLoader(uri);
  }
  // use the safe defaults provided
  return production.documentLoader(uri);
};

// const result = await myNewProductionLoader('did:sov:CYQLsccvwhMTowprMjGjQ6)
// yields:
// {
//   "contextUrl": null,
//   "documentUrl": "did:sov:CYQLsccvwhMTowprMjGjQ6",
//   "document": "{...stringEncodedDidDocument}"
// }
```

### Privacy & Security Considerations

#### Do I need to download random remote contexts?

NO! In production, you should never process ANY DATA, which your application was not designed for.

Please review [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

#### Why are context's necessary for JSON-LD and CBOR-LD?

They are a mechanism for elegantly solving semantic disambuity, in a decentralized manner.

Consier how unreasonable it is to register all the concepts of agriculture, economics, cybersecurity, finance, healthcare and e-commerce in a centralized registry.

Yet, without agreeing to a common representation for semantic concepts, how can we have interoperability, extensability and security?

That's why linked data formats like JSON-LD and CBOR-LD are so valuable.

They solve this problem, without requiring you to forever be a customer of a particular vendor, by making the vendor's data portable and interoperable outside of the software which created it...

Don't be suprised if you see Linked Data hater's in the wild...

Massive corporations that have aquired large amounts of private user and corporate information are trying hard to prevent users from leaving centralized platforms with semantically unambigious copies of _their_ data.
