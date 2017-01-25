# control-tree
Javascript library to convert your control flow into a data structure

Based on https://hackernoon.com/you-might-not-need-if-statements-a-better-approach-to-branching-logic-59b4f877697f#.ls40q37si

The decision tree could be a function or an object with a specific structure
```
{
  action: () => {}, // always get executed first
  test: () => {}, // the condition to be evaluated
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
        action: () => {
          console.log('a > b is false');
        },
        test: () => {
          return b > a
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
