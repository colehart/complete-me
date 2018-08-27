import Node from './Node';

export default class Trie {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  insert(word) {
    this.count++;
  }
};