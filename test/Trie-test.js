import { assert } from 'chai';
import fs from 'fs';
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

    assert.deepEqual(trie.root.children, { h: { endOf: 'h', children: {} } });
  });

  it('should add new branch when taking in a new word', () => {
    trie.insert('hello');

    assert.exists(trie.root.children['h']);
    assert.exists(trie.root.children['h'].children['e']);
    assert.exists(trie.root.children['h'].children['e'].children['l']);
    assert.exists(trie.root.children['h'].children['e'].children['l'].children['l']);
    assert.exists(trie.root.children['h'].children['e'].children['l'].children['l'].children['o']);
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['l'].children['o'].endOf, 'hello');
  });

  it('should add multiple new nodes of different words', () => {
    trie.insert('hello');
    trie.insert('world');

    const trieChildKeys = Object.keys(trie.root.children);

    assert.deepEqual(trieChildKeys, ['h', 'w']);
  });

  it('should add multiple new nodes with similar prefixes and track subsequent last letters', () => {
    trie.insert('hello');
    trie.insert('he');
    trie.insert('hell');
    trie.insert('helicopter');
    trie.insert('held');
    trie.insert('help');
    trie.insert('helping');

    assert.isNull(trie.root.children['h'].endOf);
    assert.equal(trie.root.children['h'].children['e'].endOf, 'he');
    assert.isNull(trie.root.children['h'].children['e'].children['l'].endOf);
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['l'].endOf, 'hell');
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['l'].children['o'].endOf, 'hello');
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['i'].children['c'].children['o'].children['p'].children['t'].children['e'].children['r'].endOf, 'helicopter');
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['d'].endOf, 'held');
    assert.equal(trie.root.children['h'].children['e'].children['l'].children['p'].endOf, 'help');
    assert.isNull(trie.root.children['h'].children['e'].children['l'].children['p'].children['i'].endOf);
  });

  it('should suggest a word based on a prefix', () => {
    trie.insert('hello');
    trie.insert('world');

    const result1 = trie.suggest('he');
    const result2 = trie.suggest('w');

    assert.deepEqual(result1, ['hello']);
    assert.deepEqual(result2, ['world']);
  });

  it('should not suggest a word that does not occur in the trie', () => {
    trie.insert('hello');

    const result = trie.suggest('hey');

    assert.isUndefined(result);
  });

  it('should suggest all possible words based on a prefix', () => {
    trie.insert('hello');
    trie.insert('world');

    const result = trie.suggest('he');

    assert.deepEqual(result, ['hello']);

    trie.insert('hellen');

    const result2 = trie.suggest('he');

    assert.deepEqual(result2, ['hello', 'hellen']);
  });

  it('should be able to take in words and return the count', () => {
    trie.insert('hello');
    assert.equal(trie.count(), 1);

    trie.insert('world');
    assert.equal(trie.count(), 2);
  });

  it('should populate the trie with the default dictionary', () => {
    const path = '/usr/share/dict/words'
    const dictionary = fs.readFileSync(path).toString().trim().split('\n');

    trie.populate(dictionary);

    const count = trie.count();

    assert.equal(count, 235886)
  });
});
// it should increment the word count, it should not increment the word count if word is duplicate,