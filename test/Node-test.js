import { assert } from 'chai'
import Node from '../lib/Node'

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('sammich');
  });

  it('should be a class', () => {
    assert.instanceOf(node, Node);
  });

  it('should default to a next of null', () => {
    assert.isNull(node.next);
  });

  it('should receive data', () => {
    assert.equal(node.data, 'sammich');
  });

  // it('should have access to full English alphabet', () => {
  //   assert.deepEqual(node.letters, ['a', 'b', 'c',
  //     'd', 'e', 'f', 'g', 'h', 'i',
  //     'j', 'k', 'l', 'm', 'n', 'o',
  //     'p', 'q', 'r', 's', 't', 'u',
  //     'v', 'w', 'x', 'y', 'z'])
  // });
});