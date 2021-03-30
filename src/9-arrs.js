/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

/*
есть массив arr1 = [1, 3, 5]; есть второй массив arr2 = [5, 2, 3, 1];
надо проверить - если все цифры с arr2 есть в arr1
несмотря на то что там есть лишние цифры или расположены по другому надо вывести тру,
если нет то фалс. Помогите реализовать это буду благодарен
*/

const f = (arr1, arr2) => {
  let result = true

  for (const val of arr2) {
    if (arr1.includes(val)) continue
    result = false
    return result
  }

  return result
}

const f2 = (arr1, arr2) => {
  // Отмечаем необходимые элементы (используется при переборе основного массива)
  const reducer1 = (state, cur) => {
    state.set(cur, false)
    return state
  }

  // Подтверждаем каждый элемент (используется при сверке с основным массивом)
  const reducer2 = (state, cur) => {
    if (state.has(cur)) state.set(cur, true)
    return state
  }
  const state = new Map()
  const step1 = arr2.reduce(reducer1, state)
  const step2 = arr1.reduce(reducer2, state)

  for (const val of step2.entries()) if (!val[1]) return false

  return true
}

let counter = 0
const test = (arr1, arr2, f, res) => console.log(`${++counter}. ${f(arr1, arr2) === res ? 'OK' : 'FAIL'}`)

test([1, 3, 5], [5, 2, 3, 1], f, false)
test([1, 3, 5], [5, 1, 3, 1], f, true)
test([1, 3, 5], [5, 2, 3, 1], f2, false)
test([1, 3, 5], [5, 1, 3, 1], f2, true)
