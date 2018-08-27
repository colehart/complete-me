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

    assert.deepEqual(trie.root, { data: 'hello',
      next: null,
      letters: ['a', 'b', 'c',
      'd', 'e', 'f', 'g', 'h', 'i',
      'j', 'k', 'l', 'm', 'n', 'o',
      'p', 'q', 'r', 's', 't', 'u',
      'v', 'w', 'x', 'y', 'z']
    });
  });

  it('should add multiple new nodes', () => {
    trie.insert('hello');
    trie.insert('world');

    assert.deepEqual(trie.root.next, { data: 'world',
      next: null,
      letters: ['a', 'b', 'c',
      'd', 'e', 'f', 'g', 'h', 'i',
      'j', 'k', 'l', 'm', 'n', 'o',
      'p', 'q', 'r', 's', 't', 'u',
      'v', 'w', 'x', 'y', 'z']
    });
  });

  it.skip('should suggest a word based on a prefix', () => {
    trie.insert('hello');
    trie.insert('world');

    result1 = trie.suggest('he');
    result2 = trie.suggest('w');

    assert.deepEqual(result1, ['hello']);
    assert.deepEqual(result2, ['world']);
  });

  it.skip('should suggest all matching world based on a prefix', () => {
    trie.insert('hello');
    trie.insert('hellen');

    result = trie.suggest('he');

    assert.deepEqual(result, ['hello', 'hellen'])
  });
});