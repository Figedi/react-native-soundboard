
// a) [a,b,c], 3, () =>
// b) [a,b,c], () =>
// c) [a,b,c], 3
// d) [a,b,c]
export function eachChunks(...args) {
  let n, arr, fct;
  // parse args
  switch (args.length) {
  case 1:
    n = 1;
    arr = args[0]
    break;
  case 2:
    if (typeof args[args.length - 1] === 'function') {
      n = 1;
      [arr, fct] = args;
    } else {
      [arr, n] = args
    }
    break;
  case 3:
    [n, arr, fct] = args;
    break;
  default:
    throw new Error('Argument error, needs to be 2 or 3 args ')
  }
  // guard clauses
  if (n === 0) return [];
  if (n > arr.length) {
    n = arr.length - 1;
  }
  // actual chunking
  let chunks = [];
  let i = 0;
  let max = arr.length;
  while (i < max) {
    let chunk = arr.slice(i, i += n);
    if (fct) {
      fct(chunk);
    }
    chunks.push(chunk);
  }
  return chunks;
}
