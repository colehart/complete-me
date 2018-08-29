import { assert } from 'chai';
import locus from 'locus';
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
    assert.equal(trie.wordCount, 0);
  });

  it('should have a default root of null', () => {
    assert.isNull(trie.root);
  });

  it('should add new node when taking in a new letter', () => {
    trie.insert('h');

    assert.isNull(trie.root.letter);
    assert.deepEqual(trie.root.children, { h: { letter: 'h', lastLetter: true, children: {} } });
  });

  it('should add new branch when taking in a new word', () => {
    trie.insert('hello');

    assert.equal(trie.root.children['h'].letter, 'h');
    assert.equal(trie.root.children['h'].children['e'].letter, 'e');
    assert.equal(trie.root.children['h'].children['e'].children['l'].letter, 'l');
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['l'].letter, 'l');
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['l'].children['o'].letter, 'o');
    assert.isTrue(trie.root.children['h'].children['e'].children['l'].children['l'].children['o'].lastLetter);
  });

  it('should add multiple new nodes of different words', () => {
    trie.insert('hello');
    trie.insert('world');

    let trieChildKeys = Object.keys(trie.root.children);

    assert.deepEqual(trieChildKeys, ['h', 'w']);
  });

  it('should add multiple new nodes with similar prefixes and track subsequent last letters', () => {
    trie.insert('hello');
    trie.insert('he');
    trie.insert('hell');
    trie.insert('helloween');
    trie.insert('held');
    trie.insert('help');
    trie.insert('helping');

    assert.isFalse(trie.root.children['h'].lastLetter);
    assert.isTrue(trie.root.children['h'].children['e'].lastLetter);
    assert.isFalse(trie.root.children['h'].children['e'].children['l'].lastLetter);
    assert.isTrue(trie.root.children['h'].children['e'].children['l'].children['l'].lastLetter);
    assert.isTrue(trie.root.children['h'].children['e'].children['l'].children['l'].children['o'].lastLetter);
    assert.isTrue(trie.root.children['h'].children['e'].children['l'].children['l'].children['o'].children['w'].children['e'].children['e'].children['n'].lastLetter);
    assert.isTrue(trie.root.children['h'].children['e'].children['l'].children['d'].lastLetter);
    assert.isTrue(trie.root.children['h'].children['e'].children['l'].children['p'].lastLetter);
    assert.isFalse(trie.root.children['h'].children['e'].children['l'].children['p'].children['i'].lastLetter);
  });

  it('should suggest a word based on a prefix', () => {
    trie.insert('hello');
    trie.insert('world');

    let result1 = trie.suggest('he');
    let result2 = trie.suggest('w');

    assert.deepEqual(result1, ['hello']);
    assert.deepEqual(result2, ['world']);
  });

  it.skip('should suggest all matching world based on a prefix', () => {
    trie.insert('hello');
    trie.insert('hellen');

    let result = trie.suggest('he');

    assert.deepEqual(result, ['hello', 'hellen'])
  });

  it.skip('should be able to take in words and return the count', () => {
    trie.insert('hello');
    assert.equal(trie.count(), 1);

    trie.insert('world');
    assert.equal(trie.count(), 2);
  });
});