const person = {
  name: 'Maxim',
  greeting() {
    console.log('Hello,', this.name)
  },
}

const lena = Object.create(person)
lena.name = 'Lena'

lena.greeting()
person.greeting.apply(lena)

person.greeting()
person.greeting.apply(person)
