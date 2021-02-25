/* eslint-disable no-restricted-syntax */
const testedArr = ['fgdh', 'sda', 'ttt', 'sad', '1', 'djf', 'dfg', 'hfd', 'bnvk', 'fghg', 'knvb']

/* ЗАДАЧА:
  Если встречаются анаграммы (хотя бы 1 раз), вывести первое слово
*/

const getStandard = (str) => [...str].sort().join('')

const getFirstAnagram0 = (testedVal) => {
  const standard = getStandard(testedVal)
  const state = {}
  const result = null

  for (let i = 0, max = testedArr.length; i < max; i++) {
    const isAnagram = standard === getStandard(testedArr[i])

    if (isAnagram) {
      if (!state[standard]) {
        state[standard] = { firstValue: testedArr[i], count: 1 }
      } else {
        state[standard].count++
        if (state[standard].count >= 2) return state[standard].firstValue
      }
    }
  }

  return result
}

console.time('1.0')
console.log(getFirstAnagram0('das'))
console.timeEnd('1.0')

console.time('1.1')
console.log(getFirstAnagram0('bnkv'))
console.timeEnd('1.1')

const getFirstAnagram1 = (testedVal) => {
  const standard = getStandard(testedVal)
  const state = {}
  const result = null

  for (const item of testedArr) {
    const isAnagram = standard === getStandard(item)

    if (isAnagram) {
      if (!state[standard]) {
        state[standard] = { firstValue: item, count: 1 }
      } else {
        state[standard].count++
        if (state[standard].count >= 2) return state[standard].firstValue
      }
    }
  }

  return result
}

console.time('2.0')
console.log(getFirstAnagram1('das'))
console.timeEnd('2.0')

console.time('2.1')
console.log(getFirstAnagram1('bnkv'))
console.timeEnd('2.1')

const getFirstAnagram2 = (testedVal) => {
  const standard = getStandard(testedVal)
  const state = new Map()
  const result = null

  for (const item of testedArr) {
    const isAnagram = standard === getStandard(item)

    if (isAnagram) {
      if (!state.has(standard)) {
        state.set(standard, { firstValue: item, count: 1 })
      } else {
        const oldVal = state.get(standard)
        const { count, firstValue } = oldVal
        const newVal = { ...oldVal, count: count + 1 }

        if (newVal.count >= 2) return firstValue

        state.set(standard, newVal)
      }
    }
  }

  return result
}

console.time('3.0')
console.log(getFirstAnagram2('das'))
console.timeEnd('3.0')

console.time('3.1')
console.log(getFirstAnagram2('bnkv'))
console.timeEnd('3.1')
