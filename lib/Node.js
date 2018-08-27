export default class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
    // this.letters = ['a', 'b', 'c',
    //   'd', 'e', 'f', 'g', 'h', 'i',
    //   'j', 'k', 'l', 'm', 'n', 'o',
    //   'p', 'q', 'r', 's', 't', 'u',
    //   'v', 'w', 'x', 'y', 'z'];
  }
}