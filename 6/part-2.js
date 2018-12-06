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
}).on('close', () => calculateAreas(data))

/* Solution */

function calculateAreas(data) {
  const coords = []
  let minX = Infinity
  let minY = Infinity
  let maxX = 0
  let maxY = 0

  for(let i = 0; i < data.length; i++) {
    // Create coordinate pair objects for each data point
    const xy = data[i].split(",")
    xy[0] = parseInt(xy[0].trim())
    xy[1] = parseInt(xy[1].trim())
    coords.push(
      {
        x: xy[0],
        y: xy[1]
      }
    )

    // Calculate grid boundaries and size
    if(xy[0] < minX) minX = xy[0]
    if(xy[1] < minY) minY = xy[1]
    if(xy[0] > maxX) maxX = xy[0]
    if(xy[1] > maxY) maxY = xy[1]
  }

  const grid = []
  // Generate grid
  for(let i = minX - 1; i <= maxX + 1; i++) {
    for(let j = minY - 1; j <= maxY + 1; j++) {
      grid.push(
        {
          x: i,
          y: j,
          distances: []
        }
      )
    }
  }

  // Go through grid and calculate distance to each data point
  for(point in grid) {
    for(coord in coords) {
      // Manhattan distance between points
      const distance = calculateDistance(grid[point], coords[coord])

      // Distance is longer than some previous one -> ignore
      grid[point].distances.push(distance)
    }
  }

  let safePoints = 0

  for(point in grid) {
    const totalDistance = grid[point].distances.reduce((prev, cur) => {
      return prev + cur
    }, 0)

    if(totalDistance < 10000) safePoints++
  }


  console.log(safePoints) // <-- this should be the result
}

function calculateDistance(point1, point2) {
  const distX = point1.x > point2.x ? point1.x - point2.x : point2.x - point1.x
  const distY = point1.y > point2.y ? point1.y - point2.y : point2.y - point1.y

  return distX + distY
}
