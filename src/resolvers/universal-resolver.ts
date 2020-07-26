import fetch from 'node-fetch';

const getJson = async (url: string) =>
  fetch(url, {
    headers: {
      Accept: 'application/ld+json',
    },
    method: 'get',
  }).then((data: any) => data.json());

const resolver = {
  resolve: async (didUri: string) => {
    try {
      const baseUrl = 'https://uniresolver.io/1.0/identifiers/';
      const result = await getJson(baseUrl + didUri);
      const { didDocument } = result;
      return {
        contextUrl: null, // this is for a context via a link header
        document: didDocument, // this is the actual document that was loaded
        documentUrl: didUri, // this is the actual context URL after redirects
      };
    } catch (e) {
      console.error(e);
      throw new Error('UniversalResolver -> Resolution Failed -> ' + e.message);
    }
  },
};

export { resolver };
