// takes a tree and executes the results
function controlTree(tree) {
  let flag;
  let result;
  // executes action key
  if (tree.action && (typeof tree.action == 'function')) {
    tree.action();
  }
  // executes test
  if (tree.test && (typeof tree.test == 'function')) {
    flag = tree.test();
  }
  // executes true / false as per result of test
  if (flag && tree.true) {
    if (typeof tree.true == 'function') {
      result = tree.true();
    } else {
      controlTree(tree.true);
    }
  } else if (!flag && tree.false){
    if (typeof tree.false == 'function') {
      result = tree.false();
    } else {
      controlTree(tree.false);
    }
  }
  if (result) {
    controlTree(result);
  }
}

module.exports = controlTree;
