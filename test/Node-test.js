import { assert } from 'chai'
import locus from 'locus';
import Node from '../lib/Node'

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('a');
  });

  it('should be a class', () => {
    assert.instanceOf(node, Node);
  });

  it('should default to not being the last letter', () => {
    node = new Node();

    assert.isNull(node.endOf);
  });

  it('should default to having an empty object of children', () => {
    assert.deepEqual(node.children, {});
  });
});

// it exists, it is an instance of node, it hast he correct default properties, it takes in a letter