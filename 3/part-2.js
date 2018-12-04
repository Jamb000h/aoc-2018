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

  // Remove all 'coordinates' that have more than 1 hits
  for(claim in claims) {
    if(claims[claim] > 1) {
      delete claims[claim]
    }
  }

  // Find the claim that has all its coordinates remaining
  for(let i = 0; i < data.length; i++) { // Loop through each line of data
    const obj = parseLine(data[i])
    const left = obj.left
    const top = obj.top
    const width = obj.width
    const height = obj.height
    let found = true // Flag for signaling that  the correct claim has been found

    for(let i = left; i < left + width; i++) { // Go through each 'row'
      for(let j = top; j < top + height; j++) { // Go through each 'column'
        const key = i + ',' + j // Create key for a 'coordinate'
        if(claims[key] === undefined) {
          found = false
          break
        }
      }
      if(found === false) {
        break
      }
    }

    if(found === true) {
      console.log(obj.id) // <-- This should be the result
      return
    }
  }
}

function parseLine(line) {
  const parts = line.replace(':', '').split(' ')
  const coords = parts[2].split(',')
  const size = parts[3].split('x')
  return {
    id: parts[0],
    left: parseInt(coords[0]),
    top: parseInt(coords[1]),
    width: parseInt(size[0]),
    height: parseInt(size[1])
  }
}