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
    if (lastStatus && !currNode.children[newLetter].lastLetter) {
      currNode.children[newLetter].lastLetter = lastStatus;
    }
  }

  suggest(prefix) {
    let currNode = this.root;
    let splitWord = this.getSplitWord(prefix);
    let currLetter = this.getNewLetter(splitWord);
    let matches = [];

    while (splitWord.length > -1) {
      if (currNode.children[currLetter]) {
        matches = this.addMatches(matches, currLetter, currNode);
        currNode = currNode.children[currLetter];
        currLetter = this.getNewLetter(splitWord);
        eval(locus);
      }
    }

    return matches;
  }

  addMatches(currMatches, currLetter, currNode) {
    let matches = currMatches;

    if (!matches.length) {
      matches.push(currLetter);

    } else {
      eval(locus);
      this.runLetterTrace(currLetter, currNode);
      matches.forEach(match => {
        match += currLetter;
      })
    }

    return matches;
  }

  runLetterTrace(currLetter, currNode) {
    let currentNode = currNode;
    let currentLetter = currLetter;

    if (currentNode.children[currentLetter].lastLetter) {
      return currentLetter;
    }
  }

  count() {
    return this.wordCount;
  }
}