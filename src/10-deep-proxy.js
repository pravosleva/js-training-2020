/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const state = {
  spFormForPersonal: {
    a: 0,
    b: 1,
    c: 2,
    d: {
      a: 0,
    },
  },
}
class DeepProxy {
  constructor(target, handler) {
    this._preproxy = new WeakMap()
    this._handler = handler
    return this.proxify(target, [])
  }

  makeHandler(path) {
    const dp = this
    return {
      set(target, key, value, receiver) {
        // console.log(path)
        // Sample for spFormForPersonal.d.a: [ 'spFormForPersonal', 'd' ]

        if (typeof value === 'object') {
          value = dp.proxify(value, [...path, key])
        }
        target[key] = value

        if (dp._handler.set) {
          dp._handler.set(target, [...path, key], value, receiver)
        }
        return true
      },

      deleteProperty(target, key) {
        if (Reflect.has(target, key)) {
          dp.unproxy(target, key)
          const deleted = Reflect.deleteProperty(target, key)
          if (deleted && dp._handler.deleteProperty) {
            dp._handler.deleteProperty(target, [...path, key])
          }
          return deleted
        }
        return false
      },
    }
  }

  unproxy(obj, key) {
    if (this._preproxy.has(obj[key])) {
      // console.log('unproxy', key);
      obj[key] = this._preproxy.get(obj[key])
      this._preproxy.delete(obj[key])
    }

    for (const k of Object.keys(obj[key])) {
      if (typeof obj[key][k] === 'object') {
        this.unproxy(obj[key], k)
      }
    }
  }

  proxify(obj, path) {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object') {
        obj[key] = this.proxify(obj[key], [...path, key])
      }
    }
    const p = new Proxy(obj, this.makeHandler(path))
    this._preproxy.set(p, obj)
    return p
  }
}

const proxiedState = new DeepProxy(state, {
  set(target, path, value, receiver) {
    console.log('set', path.join('.'), '=', JSON.stringify(value))
  },

  deleteProperty(target, path) {
    // console.log('delete', path.join('.'))
    throw new Error('Cant delete prop')
  },
})

console.log(proxiedState.spFormForPersonal.a)
console.log(proxiedState.spFormForPersonal.b)
console.log(proxiedState.spFormForPersonal.c)
proxiedState.spFormForPersonal.c += 1
console.log(proxiedState.spFormForPersonal.c)
proxiedState.spFormForPersonal.d.a += 1
console.log(proxiedState.spFormForPersonal.d.a)
