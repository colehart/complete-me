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

  it('should have a default length of 0', () => {
    assert.equal(trie.length, 0);
  });

  it('should have a default head of null', () => {
    assert.isNull(trie.head);
  });
});