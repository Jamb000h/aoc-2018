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
}).on('close', () => calculateChecksum(data))

/* Solution */

let twice = 0
let thrice = 0

function calculateChecksum(data) {
  for(let i = 0; i < data.length; i++) {
    const chars = data[i].split('')
    const charMap = {}
    for(let j = 0; j < chars.length; j++) {
      charMap[chars[j]] = charMap[chars[j]] === undefined ? 1 : charMap[chars[j]] + 1
    }
    
    const charMapValues = Object.values(charMap)

    if(charMapValues.includes(2)) {
      twice += 1
    }

    if(charMapValues.includes(3)) {
      thrice += 1
    }

  }
  console.log(twice * thrice)
}