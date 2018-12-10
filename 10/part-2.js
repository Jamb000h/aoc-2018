/* Boilerplate */
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

const data = []

rl.on('line', (line) => {
  data.push(line)
}).on('close', () => calculateMessage(data))

/* Solution */

function calculateMessage(data) {
  let points = data.map(point => {

    const values = point.match('<(.*),(.*)>.*<(.*),(.*)>')

    return {
      x: Number(values[1].trim()),
      y: Number(values[2].trim()),
      vX: Number(values[3].trim()),
      vY: Number(values[4].trim())
    }
    
  })

  let seconds = 0

  while(true) {
    seconds += 1
    points = points.map(updatePosition)

    const top = Math.min(...points.map(point => point.y))
    const bottom = Math.max(...points.map(point => point.y))
    const left = Math.min(...points.map(point => point.x))
    const right = Math.max(...points.map(point => point.x))
    
    if(Math.abs(bottom) - Math.abs(top) < 13 && Math.abs(right) - Math.abs(left) < 100) {
      console.log(seconds) // < This is the result
      break
    }
  }
}

function updatePosition(point) {
  return {...point, x: point.x += point.vX, y: point.y += point.vY}
}