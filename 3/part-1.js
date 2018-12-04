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
}).on('close', () => findOverlaps(data))

/* Solution */

const claims = {}

function findOverlaps(data) {
  for(let i = 0; i < data.length; i++) { // Loop through each line of data
    const obj = parseLine(data[i])
    const left = obj.left
    const top = obj.top
    const width = obj.width
    const height = obj.height

    for(let i = left; i < left + width; i++) { // Go through each 'row'
      for(let j = top; j < top + height; j++) { // Go through each 'column'
        const key = i + ',' + j // Create key for a 'coordinate'
        // Either give a 'coordinate' a default value of 1 or increase by 1 if found
        claims[key] = claims[key] === undefined ? 1 : claims[key] + 1
      }
    }

  }

  // See how many 'coordinates' have more than 1 hits
  const hits = Object.values(claims)
  let overlaps = 0
  for(let i = 0; i < hits.length; i++) {
    if(hits[i] > 1) {
      overlaps++
    }
  }

  console.log(overlaps) // <-- This should be the result
}

function parseLine(line) {
  const parts = line.replace(':', '').split(' ')
  const coords = parts[2].split(',')
  const size = parts[3].split('x')
  return {
    left: parseInt(coords[0]),
    top: parseInt(coords[1]),
    width: parseInt(size[0]),
    height: parseInt(size[1])
  }
}