module.exports = function(reducer) {
  return function(state, action) {
    return state.map(function(itemState) {
      return reducer(itemState, action);
    });
  };
};
