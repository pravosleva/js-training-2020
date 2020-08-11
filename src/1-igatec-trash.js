/* eslint-disable no-shadow, no-plusplus, implicit-arrow-linebreak */

// 1
const name = 'Alexey'
function sayHi() {
  console.log(name)
}

setTimeout(() => {
  // eslint-disable-next-line no-unused-vars
  const name = 'Vadim'
  sayHi()
}, 1000)

// 2
// eslint-disable-next-line no-use-before-define
f.call(f) // [Function: f]
function f() {
  console.log(this)
}
f() // global

// 3: var or let
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1)
}

const wait = (time) =>
  // code here
  new Promise((res) => setTimeout(res, time))

// usage
wait(2000)

// 3
const format = (data) =>
  // todo
  data.map(({ name, title }) => `Name: ${name} Title: ${title}`).join('\n')

const data = [
  {
    name: 'Name 1',
    title: 'Title 1',
  },
  {
    name: 'Name 2',
    title: 'Title 2',
  },
  {
    name: 'Name 3',
    title: 'Title 3',
  },
]
const formattedData = format(data)

console.log(formattedData)

// Expected result
/*
Name 1: Title 1
Name 2: Title 2
Name 3: Title 3
*/

// 4
// class A extends React.Component {
//   constructor(){
//       super()
//       this.state = {
//           name: 'Alexey'
//       }
//   }
//   getName() {
//       return this.state.name
//   }
//   componentDidMount() {
//       this.setState({ name: 'Vadim' }, () => {
//         console.log(this.getName())
//       })
//   }
//   render() {
//       return <div>${this.getName()}</div>
//   }
// }
