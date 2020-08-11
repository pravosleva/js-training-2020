/* Adding Babel to project

STEP 1: Deps

yarn add -D @babel/cli @babel/core
yarn add @babel/polyfill core-js

STEP 2: .babelrc

{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.4"
      }
    ]
  ],
  "plugins": ["@babel/plugin-syntax-optional-chaining"]
}

STEP 3: package.json

"scripts": {
  "start:6": "yarn build:6 && node dist.6/6-babel",
  "build:6": "./node_modules/.bin/babel 6-babel.js --out-dir dist.6",
}
*/

const a = {
  b: {
    c: 6,
  },
}

console.log('es2020 syntax test', a.b?.c)
