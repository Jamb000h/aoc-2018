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

  const sleepiestGuardOnMinute = {
      guardId: -1,
      minute: -1,
      minutesSlept: -1
  }
  for(guard in sleepLog) {
    for(min in sleepLog[guard]) {
      if(sleepLog[guard][min] > sleepiestGuardOnMinute['minutesSlept']) {
        sleepiestGuardOnMinute['guardId'] = guard
        sleepiestGuardOnMinute['minute'] = min
        sleepiestGuardOnMinute['minutesSlept'] = sleepLog[guard][min]
      }
    }
  }

  console.log(sleepiestGuardOnMinute['guardId'] * sleepiestGuardOnMinute['minute'])
}