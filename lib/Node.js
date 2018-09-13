export default class Node {
  constructor(word = null) {
    this.endOf = word;
    this.children = {};
  }
}