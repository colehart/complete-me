export default class Node {
  constructor(letter = null, word = null) {
    this.letter = letter;
    this.endOf = word;
    this.children = {};
  }
}