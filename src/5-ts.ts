// yarn add -D @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript

import { testFn } from './5.1-importable'

type TGreeting = 'hello ts'

const a: TGreeting = 'hello ts'
console.log(a)
console.log(testFn())
