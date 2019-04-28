import Client from './requestUtils';
const client = new Client();

export function search(searchTerm, n=10) {
  client.get('search', {n});
};
