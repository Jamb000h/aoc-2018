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
}).on('close', () => findFirstDuplicateFrequency(data))

/* Solution */

let frequency = 0
const frequencyHistory = []

function findFirstDuplicateFrequency(data) {
  for(let i = 0; i < data.length; i++) {
    frequency += data[i]
    for(let j = 0; j < frequencyHistory.length; j++) {
      if(frequencyHistory[j] === frequency) {
        console.log(frequency)
        return
      }
    }
    frequencyHistory.push(frequency)
  }
  findFirstDuplicateFrequency(data)
}
