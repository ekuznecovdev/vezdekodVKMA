export const getRandNum = (min, max, exist) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let num = null;
  while (!num || num == exist) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
};

export const getArrayToNum = (max, min = 1) => {
  let arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
};
