/* Boilerplate */
const fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) throw err
    removePolymers(data.toString())
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

  console.log(unitMap)

  let shortestPolymerLength = Infinity

  for(unit in unitMap) {
    console.log('Going through unit', unit)
    const filteredData = data
                          .split("")
                          .filter( char => !(char === unitMap[unit][0] || char === unitMap[unit][1]))
                          .join("")
    const filteredPolymerLength = calculatePolymers(filteredData)

    if(filteredPolymerLength < shortestPolymerLength) {
      shortestPolymerLength = filteredPolymerLength
    }
  }

  console.log(shortestPolymerLength)

}

function calculatePolymers(data) {
  let i = 0

  while(i < data.length - 1) {
    if(data.charAt(i) !== data.charAt(i + 1)) {
      const re = new RegExp(data.charAt(i), 'i')
      if(data.charAt(i + 1).match(re)) {
        data = data.substr(0, i) + data.substr(i + 2, data.length - 1)
        i = i - 2 < 0 ? 0 : i - 2
        continue
      }
    }
    i++
  }

  return data.length
}