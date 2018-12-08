/* Boilerplate */
const fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) throw err
    parseNodes(data.toString())
})

/* Solution */

let index = 0

function parseNodes(data) {
  const dataNumbers = data.split(" ").map(x => parseInt(x))
  console.log(parseData(dataNumbers))
}

function parseData(data) {
  const children = data[index]
  index++

  const metadataEntries = data[index]
  index++

  let nodeValue = 0

  if(children === 0) {
    for(let i = 0; i < metadataEntries; i++) {
      nodeValue += data[index]
      index++
    }
  } else {
    let childrenValues = []
    for(let i = 0; i < children; i++) {
      childrenValues.push(parseData(data))
    }

    for(let i = 0; i < metadataEntries; i++) {
      if(data[index] > 0 && childrenValues[data[index] - 1] !== undefined) {
        nodeValue += childrenValues[data[index] - 1]
      }
      index++
    }
  }
  return nodeValue
}