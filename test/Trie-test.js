import { assert } from 'chai';
import Trie from '../lib/Trie';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should be a class', () => {
    assert.instanceOf(trie, Trie);
  });
});