const {Redis} = require('@upstash/redis')

const redis = new Redis({
  url: 'https://becoming-gator-53672.upstash.io',
  token: 'AdGoAAIncDE0MmIzZWZkMjAxNTA0MGQxYThlNjcyMzc3M2ZiZjY4YXAxNTM2NzI',
})

console.log("connected to redis")
module.exports = redis;