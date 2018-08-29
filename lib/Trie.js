import Node from './Node';

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = null;
  }

  insert(word) {
    let currNode = this.root;
    let splitWord = this.getSplitWord(word);
    let endOf = null;
    let newLetter;

    this.increaseWordCount();

    while (splitWord.length) {
      if (!currNode) {
        currNode = this.createRoot();

      } else {
        newLetter = this.getNewLetter(splitWord);

        if (splitWord.length === 0) {
          endOf = word;
        }

        currNode = this.checkChildren(currNode, newLetter, endOf, word);
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

  checkChildren(currNode, newLetter, endOf, word) {
    let currentNode = currNode;

    while (currentNode) {
      if (!currentNode.children[newLetter]) {
        this.createChild(currentNode, newLetter, endOf);
        return currentNode.children[newLetter];

      } else {
        this.setEndOf(currentNode, newLetter, endOf, word);
        return currentNode.children[newLetter];
      }
    }
  }

  createChild(currentNode, newLetter, endOf) {
    currentNode.children[newLetter] = new Node(newLetter, endOf);
  }

  setEndOf(currNode, newLetter, endOf, word) {
    if (endOf && !currNode.children[newLetter].endOf) {
      currNode.children[newLetter].endOf = word;
    }
  }

  suggest(prefix) {
    let currNode = this.root;
    let splitWord = this.getSplitWord(prefix);
    let currLetter = this.getNewLetter(splitWord);
    let matches = [];

    while (currLetter) {
      if (currNode.children[currLetter]) {
        currNode = currNode.children[currLetter];
        currLetter = this.getNewLetter(splitWord);
      } else {
        return;
      }
    }

    matches = this.addMatches(currNode, matches)

    return matches;
  }

  addMatches(currNode, matches) {
    let currentNode = currNode;
    let newMatches = matches;

    if (!Object.keys(currentNode.children).length) {
      return currentNode.endof;
    }

    Object.keys(currentNode.children).forEach(child => {
      if (currentNode.children[child].endOf) {
        newMatches.push(currentNode.children[child].endOf);
      }

      this.addMatches(currentNode.children[child], newMatches);
    })

    return newMatches;
  }

  count() {
    return this.wordCount;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}