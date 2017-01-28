const controlTree = require('./control-tree');
const assert = require('chai').assert;

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

describe('noasync-test', () => {
  it('should return largest as 2', done => {
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
              param.largest = param.a;
              console.log('a > b is true');
            }
          }
        },
        false: () => {
          param.largest = param.b;
        }
      }
    }
    let testObj = {
      a: 1,
      b: 2
    };
    controlTree(testTree(testObj));
    done(assert.equal(testObj.largest, 2));
  });

  it('should properly handle nested if', done => {
    let testObj = {
      a: 6,
      b: 5,
      c: 7,
      largest: 0
    }

    function testTree(param) {
      return {
        test: () => {
          return param.a > param.b;
        },
        true: () => {
          return {
            action: () => {
              param.largest = param.a;
            },
            test: () => {
              return param.largest > param.c;
            },
            false: () => {
              param.largest = param.c;
            }
          };
        },
        false: () => {
          return {
            action: () => {
              param.largest = param.b;
            },
            test: () => {
              return param.largest > param.c;
            },
            false: () => {
              param.largest = param.c;
            }
          };
        }
      };
    };

    controlTree(testTree(testObj));

    done(assert.equal(testObj.largest, 7));
  });
});

describe('async-test', () => {
  it('should do test on an async function', done => {
    function testTree(param) {
      return {
        type: 'ASYNC',
        action: () => {
          console.log('Tree init');
        },
        test: cb => {
          setTimeout(() => {
            cb(param.a > param.b);
          }, 1000);
        },
        true: {
          action: () => {
            param.largest = param.a;
          },
          test: () => {
            return param.c > param.a;
          },
          false: {
            action: () => {
              done(assert.equal(param.largest, 2));
            }
          }
        }
      }
    }
    controlTree(testTree({
      a: 2,
      b: 0
    }));
  });
});
