const testedArr = ['dsa', 'ttt', 'sad', '1']

/* ЗАДАЧА:
  Если встречаются анаграммы (хотя бы 1 раз), вывести первое слово
*/

const getModifiedStr = (str) => [...str].sort().join('')

const print1 = (arr) => {
  const state = {}

  for (let i = 0; i < arr.length; i++) {
    const standartVal = getModifiedStr(arr[i])

    if (!state[standartVal]) {
      state[standartVal] = { firstValue: arr[i], flag: false }
    } else {
      state[standartVal].flag = true
      break
    }
  }

  Object.keys(state).forEach((elm) => {
    if (state[elm].flag) console.log(state[elm].firstValue)
  })
}

console.time('1')
print1(testedArr)
console.timeEnd('1')
