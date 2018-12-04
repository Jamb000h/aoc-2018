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
  data.push(parseInt(line))
}).on('close', () => calculateFinalFrequency(data))

/* Solution */
function calculateFinalFrequency(data) {
  const finalFreq = data.reduce((prev, cur) => prev += cur, 0)
  console.log(finalFreq)
}

