const controlTree = require('./control-tree');

function testTree(param) {
  return {
    action: () => {
      console.log('Tree init');
    },
    test: () => {
      return param.a > param.b;
    },
    true: () => {
      return {
        action: () => {
          console.log('a > b is true')
        }
      }
    },
    false: () => {
      return {
        action: () => {
          console.log('a > b is false');
        },
        test: () => {
          return param.b > param.a
        },
        true: () => {
          console.log('b > a is true');
        },
        false: () => {
          console.log('b > a is false');
        }
      }
    }
  }
}

controlTree(testTree({
  a: 10,
  b: 12
}));
