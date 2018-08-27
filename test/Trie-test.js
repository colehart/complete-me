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

  it('should have a default count of 0', () => {
    assert.equal(trie.count, 0);
  });

  it('should have a default root of null', () => {
    assert.isNull(trie.root);
  });

  it('should be able to take in words', () => {
    trie.insert('hello');

    assert.equal(trie.count, 1);

    trie.insert('world');

    assert.equal(trie.count, 2);
  });

  it('should add new node when taking in a new word', () => {
    trie.insert('hello');

    assert.deepEqual(trie.root, { data: 'hello', next: null });
  });

  it('should add multiple new nodes', () => {
    trie.insert('hello');
    trie.insert('world');

    assert.deepEqual(trie.root.next, { data: 'world', next: null });
  })
});