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
        type: 'ASYNC',
        action: () => {
          console.log('a > b is false');
        },
        test: (cb) => {
          setTimeout(() => {
            if (param.b > param.a) {
              cb(true);
            } else {
              cb(false);
            }
          }, 2000);
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
