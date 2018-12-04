/* Boilerplate */
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

const data = []

rl.on('line', (line) => {
  data.push(line)
}).on('close', () => findSleepyGuard(data))

/* Solution */

function findSleepyGuard(data) {

  const sleepLog = {}
  let currentId = 0
  let fellAsleepTime = 0
  let wokeUpTime = 0

  data.sort((a, b) => {
    // a > b = 1 == ascending sort
    return a.substring(1, 17) > b.substring(1, 17) ? 1 : -1
  }).forEach(line => {
    // New guard starts
    if(line.indexOf('#') !== -1) {
      currentId = line.match('#([0-9])+')[0].substring(1)
      // Create a new 'map' for guard if needed
      if(sleepLog[currentId] === undefined) {
        sleepLog[currentId] = {}
      }
    }

    // Guard falls asleep
    if(line.indexOf('falls') !== -1) {
      fellAsleepTime = line.match(':([0-9])+')[0].substring(1)
    }

    // Guard wakes up
    if(line.indexOf('wakes') !== -1) {
      wokeUpTime = line.match(':([0-9])+')[0].substring(1)
      for(let i = wokeUpTime - 1; i >= fellAsleepTime; i--) {
        sleepLog[currentId][i] = sleepLog[currentId][i] === undefined ? 1 : sleepLog[currentId][i] + 1
      }
    }
  })

  const guardMinutes = []

  for(guard in sleepLog) {
    guardMinutes.push({
      id: guard,
      minutes: Object
                .values(sleepLog[guard])
                .reduce((prev, cur) => prev + cur, 0) // Yay total minutes per guard
    })
  }

  const sleepiestGuard = guardMinutes.sort((a, b) => {
    // b > a = 1 == descending sort
    return b.minutes > a.minutes ? 1 : -1
  })[0]

  let sleepiestMinute = 0

  for(minute in sleepLog[sleepiestGuard['id']]) {
    if(sleepLog[sleepiestGuard['id']][minute] > sleepLog[sleepiestGuard['id']][sleepiestMinute]) {
      sleepiestMinute = minute
    }
  }

  console.log(parseInt(sleepiestMinute) * parseInt(sleepiestGuard['id']))
}