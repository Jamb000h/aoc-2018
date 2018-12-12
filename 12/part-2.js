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
}).on('close', () => grow(data))

/* Solution */

function grow(data) {
  let pots = data.shift().split(" ")[2]
  let zeroIndex = 0
  data.shift()
  const rules = data.map( rule => {
    const ruleParts = rule.split(" ")
    return {
      rule: ruleParts[0],
      outcome: ruleParts[2]
    }
  })
  const max = 50000000000
  let iterations = 0
  let sumnminus2 = 0
  let sumnminus1 = 0
  while(true) {
    let newPots = '..'
    if(pots.substr(0, 5) !== '.....') {
      pots = '.....' + pots
      zeroIndex += 5
    }
    if(pots.slice(-5) !== '.....') {
      pots = pots + '.....'
    }

    for(let j = 2; j < pots.length - 2; j++) {
      const potGroup = pots.substr(j - 2, 5)
      let match = false
      for(let k = 0; k < rules.length; k++) {
        if(potGroup === rules[k].rule) {
          newPots += rules[k].outcome
          match = true
          break
        }
      }
      if(match === false) {
        newPots += '.'
      }
    }
    newPots += '..'

    pots = newPots
    iterations++
    if(calculateValue(pots, zeroIndex) - sumnminus1 === sumnminus1 - sumnminus2) {
      console.log("HEP", iterations, 'iterations')
      console.log(calculateValue(pots, zeroIndex) + (sumnminus1 - sumnminus2) * (max - iterations))
      break
    }
    console.log(calculateValue(pots, zeroIndex) - sumnminus1)
    sumnminus2 = sumnminus1
    sumnminus1 = calculateValue(pots, zeroIndex)
  }
}

function calculateValue(pots, zeroIndex) {
  let sum = 0
  for(let i = 0; i < pots.length; i++) {
    if(pots.charAt(i) === '#') {
      sum += (i - zeroIndex)
    }
  }
  return sum
}