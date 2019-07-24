import Tree from './tree.js';
import Leaf from './leaf.js';


function countLeaves(tree) {
  if (tree instanceof Tree) {
    return tree.children.reduce(
      (runningTotal, child) => runningTotal + countLeaves(child), 0
    )
  } else if (tree instanceof Leaf) {
    return 1;
  }
}

const sapling = new Tree(
  new Leaf()
);

countLeaves(sapling); // 1

const tree = new Tree(
  new Tree(
    new Leaf(), new Leaf()
  ),
  new Tree(
    new Tree(
      new Leaf()
    ),
    new Tree(
      new Leaf(), new Leaf()
    ),
    new Leaf()
  )
);

countLeaves(tree)
  //=> 6
