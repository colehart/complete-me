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
        currNode = this.setChildren(currNode, newLetter, endOf, word);
      }
    }
  }

  getSplitWord(word) {
    return word.toLowerCase().split('');
  }

  increaseWordCount() {
    // add check for duplication before increasing
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

  setChildren(currNode, newLetter, endOf, word) {
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
    currentNode.children[newLetter] = new Node(endOf);
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
    let hints;

    currNode = this.findFurthestChild(currLetter, currNode, splitWord);

    if (currNode) {
      hints = this.addHints(currNode, hints);
    }

    return hints;
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

  addHints(currNode, hints = []) {
    let currentNode = currNode;
    let newHints = hints;

    Object.keys(currentNode.children).forEach(child => {
      if (currentNode.children[child].endOf) {
        newHints.push(currentNode.children[child].endOf);
      }

      this.addHints(currentNode.children[child], newHints);
    });

    return newHints;
  }

  count() {
    return this.wordCount;
  }

  populate(dictionary) {
    dictionary.forEach(word => this.insert(word));
  }
}

// add delete function:
// Delete - prefix tree

// Take in word
// Have to check for children on furthest child
// If children, set currentNode.endOf to null
// Else, set last node with endOf’s children to empty {}.
// If no endOfs along path, root.children shouldn’t include starting letter as key.

//select function - add rank to nodes with EndOf props