export const updateValueInArray = (array, action) => {
  return array.map( (value, index) => {
    if(index !== action.index) {
      return value;
    }
    return action.value;
  });
};

export const removeItem = (array, action) => {
  return [
    ...array.slice(0, action.index),
    ...array.slice(action.index + 1),
  ];
};

export const parseTestList = (array) => {
  return array.filter((value) => !!value.trim());
};