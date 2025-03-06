import { createClient } from 'contentful';

const client = createClient({
  space: 'zvmydju98v96', // 您的 Space ID
  accessToken: 'R1Zx-RWKIjFSasEZp457Q2z67sIwYtT9_uw5yblhzn4', // 您的 Access Token
});

export default client;