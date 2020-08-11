/* eslint-disable no-plusplus */
function fib(n) {
  // V1: LIGHT
  const result = []
  for (let i = 0; i < n; i++) {
    if (i === 0 || i === 1) {
      result.push(1)
    } else {
      result.push(result[i - 1] + result[i - 2])
    }
  }
  return result[n - 1]

  // V2: HARD
  // const arr = new Array(n);
  // for (let i = 0; i < arr.length; i++) {
  //   if (i === 0 || i === 1) {
  //     arr[i] = 1;
  //   } else {
  //     arr[i] = arr[i - 1] + arr[i - 2];
  //   }
  // }
  // return arr[n - 1];
}

console.time('fib(77)')
console.log(fib(77))
console.timeEnd('fib(77)')

// LIGHT:
// Output: "fib(77): 0.165ms"

// HARD:
// Output: "fib(77): 7.580ms"
