import * as ed25519 from '@transmute/did-key-ed25519';
import * as vcjs from '@transmute/vc.js';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { golem, contexts, types } from '../index';

let key: ed25519.Ed25519KeyPair;
let documentLoader: types.DocumentLoader;
let vc: any;

it('generate some keys', async () => {
  key = await ed25519.Ed25519KeyPair.generate({
    seed: Buffer.from(
      '9b937b81322d816cfab9d5a3baacc9b2a5febe4b149f126b3630f93a29527017',
      'hex'
    ),
  });
  key.id = key.controller + key.id;
  expect(key.publicKeyBase58).toBeDefined();
});

it('can create a documentLoader', async () => {
  documentLoader = golem
    .build({
      contexts: {
        ...contexts.W3C_Verifiable_Credentials,
        ...contexts.W3ID_Security_Vocabulary,
      },
    })
    .addContext(contexts.W3C_Decentralized_Identifiers)
    .addResolver({
      'did:key:z6': {
        resolve: async function(did: string) {
          return ed25519.driver.get({ did });
        },
      },
    })
    .buildDocumentLoader();
});

it('can issue a vc using a documentLoader', async () => {
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
      key,
      date: '2020-03-10T04:24:12.164Z',
    }),
  });

  expect(vc.proof).toBeDefined();
});

it('can verify credential using documentLoader', async () => {
  const verification = await vcjs.ld.verifyCredential({
    credential: vc,
    suite: new Ed25519Signature2018({}),
    documentLoader,
  });
  expect(verification.verified).toBe(true);
});
