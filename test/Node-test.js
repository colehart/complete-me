import { assert } from 'chai'
import Node from '../lib/Node'

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should be a class', () => {
    assert.instanceOf(node, Node);
  })
})