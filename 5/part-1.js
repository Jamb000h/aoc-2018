/* Boilerplate */
const fs = require('fs')

fs.readFile('input.txt', (err, data) => {
    if (err) throw err
    calculatePolymers(data.toString())
})

/* Solution */

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

  console.log(data.length)
}