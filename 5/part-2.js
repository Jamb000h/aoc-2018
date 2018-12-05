/* Boilerplate */
const fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) throw err
    console.time('removePolymers')
    removePolymers(calculatePolymers(data.toString()))
})

/* Solution */

function removePolymers(data) {
  // Find different unit types
  unitMap = {}
  data.toLowerCase().split("").forEach( char => {
    if(unitMap[char] === undefined) {
      unitMap[char] = [char, char.toUpperCase()]
    }
  })

  let shortestPolymerLength = Infinity

  for(unit in unitMap) {
    const filteredData = data
                          .split("")
                          .filter( char => !(char === unitMap[unit][0] || char === unitMap[unit][1]))
                          .join("")
    const filteredPolymerLength = calculatePolymers(filteredData).length

    if(filteredPolymerLength < shortestPolymerLength) {
      shortestPolymerLength = filteredPolymerLength
    }
  }
  console.timeEnd('removePolymers')
  console.log(shortestPolymerLength)

}

function calculatePolymers(data) {
  let i = 0

  while(i < data.length - 1) {
    if(data.charAt(i) !== data.charAt(i + 1)) {
      const re = new RegExp(data.charAt(i), 'i')
      if(data.charAt(i + 1).match(re)) {
        data = data.substr(0, i) + data.substr(i + 2, data.length - 1)
        i = i - 1 < 0 ? 0 : i - 1
        continue
      }
    }
    i++
  }

  return data
}