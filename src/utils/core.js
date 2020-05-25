export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

export const removeNullFields = x => {
  const obj = {};
  Object.entries(x).map(([k, v]) => {
    if (v != null) {
      obj[k] = v;
    }
  });
  return obj;
};
