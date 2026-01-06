import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'melonworks', // ★ご自身のドメインに書き換え
  apiKey: '06rAb1a2kXwQvX3HCBL3w0nMWLstXC1XqASm',               // ★ご自身のAPIキーに書き換え
});