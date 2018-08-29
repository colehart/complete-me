import Node from './Node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = null;
  }

  insert(word) {
    let currNode = this.root;
    let splitWord = this.getSplitWord(word);
    let lastStatus;
    let newLetter;

    this.increaseWordCount();

    while (splitWord.length) {
      if (!currNode) {
        currNode = this.createRoot();

      } else {
        newLetter = this.getNewLetter(splitWord);
        lastStatus = splitWord.length === 0;
        currNode = this.checkChildren(currNode, newLetter, lastStatus);
      }
    }
  }

  getSplitWord(word) {
    return word.toLowerCase().split('');
  }

  increaseWordCount() {
    this.wordCount++;
  }

  createRoot() {
    return this.root = new Node();
  }

  getNewLetter(splitWord) {
    return splitWord.shift();
  }

  checkChildren(currNode, newLetter, lastStatus) {
    let currentNode = currNode;

    while (currentNode) {
      if (!currentNode.children[newLetter]) {
        this.createChild(currentNode, newLetter, lastStatus);
        return currentNode.children[newLetter];

      } else {
        this.setLastStatus(currentNode, newLetter, lastStatus);
        return currentNode.children[newLetter];
      }
    }
  }

  createChild(currentNode, newLetter, lastStatus) {
    currentNode.children[newLetter] = new Node(newLetter, lastStatus);
  }

  setLastStatus(currNode, newLetter, lastStatus) {
    if (!currNode.children[newLetter].lastLetter && lastStatus) {
      currNode.children[newLetter].lastLetter = lastStatus;
    }
  }

  suggest(prefix) {

  }

  count() {
    return this.wordCount;
  }
};