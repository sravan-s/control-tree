# control-tree
Javascript library to convert your control flow into a data structure

[![Build Status](https://travis-ci.org/sravan-s/control-tree.svg?branch=master)](https://travis-ci.org/sravan-s/control-tree)

Based on https://hackernoon.com/you-might-not-need-if-statements-a-better-approach-to-branching-logic-59b4f877697f#.ls40q37si

The decision tree could be a function or an object with a specific structure
```
{
  type: 'ASYNC', // Type can be ASYNC or undefined
  action: () => {}, // always get executed first
  test: cb => {
    asyncFn // cb is only avaiable with ASYNC functions
      .then((err, data) => {
        if (err) { cb(false) }
        if (data) { cb(true) }
      });
  },
  true: () => {}, // what to with when test is true
  false: {
    action: () => {},
    test: () => {},
    true: () => {},
    false: () => {} // true and false could be objects or functions
  }
}
```

example:

```
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
        test: cb => {
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

```
