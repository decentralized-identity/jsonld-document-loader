import * as ed25519 from '@transmute/did-key-ed25519';
import * as vcjs from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { documentLoaderFactory, contexts, types } from '../../index';

let key: ed25519.Ed25519KeyPair;
let documentLoader: types.DocumentLoader;
let vc: any;

it('generate some keys', async () => {
  key = await ed25519.Ed25519KeyPair.generate({
    secureRandom: () => {
      return Buffer.from(
        '9b937b81322d816cfab9d5a3baacc9b2a5febe4b149f126b3630f93a29527017',
        'hex'
      );
    },
  });
  key.controller = 'https://id.gs1.org/gln/0614141123452'
  key.id = key.controller + key.id;
  expect(key.id).toBeDefined();
});

it('can create a documentLoader', async () => {
  documentLoader = documentLoaderFactory.pluginFactory
    .build({
      contexts: {
        ...contexts.W3C_Verifiable_Credentials,
        ...contexts.W3ID_Security_Vocabulary,
      },
    })
    .addContext(contexts.W3C_Decentralized_Identifiers)
    .addResolver({
      'https://id.gs1.org/gln/': {
        resolve: async function(_did: string) {
          return {
            "@context": [
              "https://www.w3.org/ns/did/v1",
            ],
            "id": "https://id.gs1.org/gln/0614141123452",
            "verificationMethod": [
              {
                "id": "#z6Mkf5rGMoatrSj1f4CyvuHBeXJELe9RPdzo2PKGNCKVtZxP",
                "type": "Ed25519VerificationKey2018",
                "controller": "https://id.gs1.org/gln/0614141123452",
                "publicKeyBase58": "dbDmZLTWuEYYZNHFLKLoRkEX4sZykkSLNQLXvMUyMB1"
              },
            ],
            "assertionMethod": [
              "#z6Mkf5rGMoatrSj1f4CyvuHBeXJELe9RPdzo2PKGNCKVtZxP"
            ]
          }
        },
      },
    })
    .buildDocumentLoader();
});

it('can issue a vc using a documentLoader', async () => {
  // relative ref handling.
  vc = await vcjs.ld.issue({
    credential: {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      id: 'http://example.gov/credentials/3732',
      type: ['VerifiableCredential', 'UniversityDegreeCredential'],
      issuer: key.controller,
      issuanceDate: '2020-03-10T04:24:12.164Z',
      credentialSubject: {
        id: 'http://example.com/subject/123',
        degree: {
          type: 'BachelorDegree',
          name: 'Bachelor of Science and Arts',
        },
      },
    },
    documentLoader,
    suite: new Ed25519Signature2018({
      key: key,
      date: '2020-03-10T04:24:12.164Z',
    }),
  });

  expect(vc).toEqual(require('./vc.json'));
});

it('can verify credential using documentLoader', async () => {
  const verification = await vcjs.ld.verifyCredential({
    credential: require('./vc.json'),
    suite: new Ed25519Signature2018({}),
    documentLoader,
  });
  expect(verification.verified).toBe(true);
});
