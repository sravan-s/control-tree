function _handleNext(tree, flag) {
  let result;
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

// takes a tree and executes the results
function controlTree(tree) {
  let flag;
  // executes action key
  if (tree.action && (typeof tree.action == 'function')) {
    tree.action();
  }
  if (tree.type == 'ASYNC') {
    let testPromise = new Promise(tree.test);
    testPromise
      .then(result => {
        _handleNext(tree, result);
      })
      .catch(err => {
        _handleNext(tree, false);
      })
  } else {
    // executes test
    if (tree.test && (typeof tree.test == 'function')) {
      flag = tree.test();
      _handleNext(tree, flag);
    }
  }
}

module.exports = controlTree;
