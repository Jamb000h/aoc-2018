/* Boilerplate */
const fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) throw err
    parseNodes(data.toString())
})

/* Solution */

let metadataTotal = 0
let index = 0

function parseNodes(data) {
  const dataNumbers = data.split(" ").map(x => parseInt(x))
  parseData(dataNumbers)
  console.log(metadataTotal)
}

function parseData(data) {
  const children = data[index]
  index++

  const metadataEntries = data[index]
  index++

  if(children === 0) {
    for(let i = 0; i < metadataEntries; i++) {
      metadataTotal += data[index]
      index++
    }
  } else {
    for(let i = 0; i < children; i++) {
      parseData(data)
    }

    for(let i = 0; i < metadataEntries; i++) {
      metadataTotal += data[index]
      index++
    }
  }
}