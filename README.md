# mapReducer

For every state object implements `#map` such as `Array` , `mapReducer(reduce)` creates a new reducer that reduces for each item using `#map`. Not related to MapReduce!

```js
var mapReducer = require('map-reducer');

// reducer for any number state
function reduce(state, action) {
  switch(action.type) {
    case 'ADD':
      return state + action.val;
    case 'MUL':
      return state * action.val;
    default:
      return state;
  }
}

console.log(reduce(3, { type: 'ADD', val: 4 })); // => 7

// create item reducer
var reduceItems = mapReducer(reduce);

// ..then
var items = [1, 3, 5];

console.log(reduceItems(items, { type: 'MUL', val: 4 })); // => [4, 12, 20]
```

