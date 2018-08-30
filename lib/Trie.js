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
        endOf = this.checkSplitWordLength(splitWord, word);
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

  checkSplitWordLength(splitWord, word) {
    if (splitWord.length === 0) {
      return word;
    }
  }

  checkChildren(currNode, newLetter, endOf, word) {
    let currentNode = currNode;

    while (currentNode) {
      if (!currentNode.children[newLetter]) {
        this.createChild(currentNode, newLetter, endOf);

      } else {
        this.setEndOf(currentNode, newLetter, endOf, word);
      }

      return currentNode.children[newLetter];
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
    let matches;

    currNode = this.findFurthestChild(currLetter, currNode, splitWord);

    if (currNode) {
      matches = this.addMatches(currNode, matches);
    }

    return matches;
  }

  findFurthestChild(currLetter, currNode, splitWord) {
    let currentLetter = currLetter;
    let currentNode = currNode;
    let query = splitWord;

    while (currentLetter) {
      if (currentNode.children[currentLetter]) {
        currentNode = currentNode.children[currentLetter];
        currentLetter = this.getNewLetter(query);
      } else {
        return;
      }
    }

    return currentNode;
  }

  addMatches(currNode, matches = []) {
    let currentNode = currNode;
    let newMatches = matches;

    if (!Object.keys(currentNode.children).length) {
      return currentNode.endOf;
    }

    Object.keys(currentNode.children).forEach(child => {
      if (currentNode.children[child].endOf) {
        newMatches.push(currentNode.children[child].endOf);
      }

      this.addMatches(currentNode.children[child], newMatches);
    });

    return newMatches;
  }

  count() {
    return this.wordCount;
  }

  populate(dictionary) {
    dictionary.forEach(word => this.insert(word));
  }
}