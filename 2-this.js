// this указывает на объект в контексте которого она была вызвана

function getT() {
  console.log(this.name)
}

const a = {
  name: 'a',
  getT, // ref
}

a.getT()
getT() // Window if !!process.browser
getT.call(a)
