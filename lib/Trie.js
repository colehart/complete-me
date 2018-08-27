import Node from './Node';

export default class Trie {
  constructor() {
    this.count = 0;
    this.root = null;
  }

  insert(word) {
    this.count++;

    if (!this.root) {
      this.root = new Node(word);
    } else {
      let currNode = this.root;

      while (currNode.next) {
        currNode = currNode.next;
      }

      currNode.next = new Node(word);
    }
  }

  suggest(prefix) {

  }
};