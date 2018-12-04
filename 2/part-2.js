/* Boilerplate */
const readline = require('readline')
const fs = require('fs')

const fileName = 'input.txt'

const rl = readline.createInterface({
  input: fs.createReadStream(fileName),
  crlfDelay: Infinity
})

const data = []

rl.on('line', (line) => {
  data.push(line)
}).on('close', () => findPrototypeFabric(data))

/* Solution */

function findPrototypeFabric(data) {
  // Go through all data points
  for(let i = 0; i < data.length; i++) {

    const chars = data[i].split('')
    // Compare single data point to all data points

    for(let j = 0; j < data.length; j++) {

      const chars2 = data[j].split('')
      if(chars.length !== chars2.length) continue // If not of equal length, skip (not relevant for this input though)

      // Compare single data point's characters to another single data point
      let differences = 0
      for(let k = 0; k < chars.length; k++) {
        if(chars[k] !== chars2[k]) {
          differences++
        }
      }

      // If just a single difference is found, this is the one we want
      if(differences === 1) {
        for(let k = 0; k < chars.length; k++) {
          if(chars[k] !== chars2[k]) {
            chars.splice(k, 1)
            console.log(chars.join('')) // <-- THIS IS THE ID
            return
          }
        }
      }
    }
  }
}