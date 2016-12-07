var assert = require('assert');
var mapReducer = require('./mapReducer');

// reducer for item
function reduce(state, action) {
  switch(action.type) {
    case 'ADD':
      return state + action.val;
    case 'MUL':
      return state * action.val;
    case 'POW2':
      return state * state;
    default:
      return state;
  }
}

// simply
assert.equal(reduce(3, { type: 'ADD', val: 2 }), 5);
assert.equal(reduce(3, { type: 'MUL', val: 2 }), 6);
assert.equal(reduce(3, { type: 'POW2' }), 9);

// creates reducer for #map-able state
var reduceItems = mapReducer(reduce);

// Array has #map method
var arrayState = [1, 2, 3, 4];
assert.deepEqual(reduceItems(arrayState, { type: 'MUL', val: 3 }), [3, 6, 9, 12]);
assert.deepEqual(reduceItems(arrayState, { type: 'POW2' }), [1, 4, 9, 16]);

// Any class implements #map
function Hash(obj) {
  this.h = obj;
}
Hash.prototype.map = function(f) {
  var obj = {};
  var _this = this;
  Object.keys(this.h).forEach(function(key) {
    obj[key] = f(_this.h[key]);
  });
  return new Hash(obj);
}
var hashState = new Hash({ a: 1, b: 2, c: 3 });
assert.deepEqual(reduceItems(hashState, { type: 'MUL', val: 5 }).h, { a: 5, b: 10, c: 15 });
assert.deepEqual(reduceItems(hashState, { type: 'POW2' }).h, { a: 1, b: 4, c: 9 });
