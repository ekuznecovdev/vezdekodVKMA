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

export const toHumanTime = (s) => {
  const min = Math.trunc(s / 60);
  const sec = Math.trunc(s - min * 60);
  if(min > 0){
    return min + " мин. " + sec + " сек.";
  } else {
    return sec + " сек.";
  }
};
