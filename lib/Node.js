export default class Node {
  constructor(letter = null, lastStatus = false) {
    this.letter = letter;
    this.lastLetter = lastStatus;
    this.children = {};
  }
}