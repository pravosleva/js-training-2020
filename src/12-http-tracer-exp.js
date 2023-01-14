/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

// NOTE: See also https://www.npmjs.com/package/http-tracer

const http = require('http')

class HttpTracer {
  constructor() {
    this.originalOutReq = http.request
    this.SIGNS = {
      arrow: '->',
      ok: '✓',
      error: '✘',
      dot: '●',
    }
  }

  getRequestUrl(options) {
    const protocol = options.protocol || 'http'
    const host = options.host || options.hostname || 'localhost'
    return options.href || `${protocol}//${host}${options.path}`
  }

  _defaultHandleRequest(options, req) {
    const url = this.getRequestUrl(options)
    const startTime = Number(new Date())

    // console.log(`${chalk.grey(`${this.SIGNS.arrow} ${req.method}`)} ${url}`)

    req.on('response', (res) => {
      const log = url
      let sign

      if (res.statusCode >= 300 && res.statusCode < 500) {
        sign = 'dot'
        // if(res.headers.location) log += chalk.grey(` ${SIGNS.arrow} ${res.headers.location}`)
      } else if (res.statusCode >= 500) {
        sign = 'error'
      } else {
        sign = 'ok'
      }

      const duration = Number(new Date()) - startTime

      console.log(`${this.SIGNS[sign]} ${log} ${duration}`)
    })
  }

  enable(params, callback) {
    let handleRequest = callback

    params = params || {}
    params.ignore = params.ignore || []

    if (typeof callback === 'function') {
      handleRequest = callback
    } else {
      handleRequest = this._defaultHandleRequest
    }

    http.request = (options, cb) => {
      const req = this.originalOutReq.call(this, options, cb)
      const reqUrl = this.getRequestUrl(options)
      for (const ignored of params.ignore) {
        if (typeof ignored === 'string' && reqUrl === ignored || ignored instanceof RegExp && ignored.test(reqUrl)) {
          return req
        }
      }
      handleRequest(options, req)
      return req
    }
  }

  disable() {
    http.request = this.originalOutReq
  }
}

const httpTracer = new HttpTracer()

httpTracer.enable({}, (...args) => {
  console.log('--- REQ: ...args')
  console.log(args)
  console.log('---')
})

const run = () => {
  const postData = JSON.stringify({
    deviceType: 'mobile_phone',
  })
  const options = {
    // hostname: 'http://pravosleva.ru',
    host: 'pravosleva.ru',
    port: 80,
    path: '/express-helper/sp/report/v2/imei/usable/get-random',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  }
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    res.on('end', () => {
      console.log('No more data in response.')
    })
  })

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
  })
  // Write data to request body
  req.write(postData)
  req.end()
}

run()
