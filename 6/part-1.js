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
          closestPoints: [],
          shortestDistance: Infinity
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
      if(distance > grid[point].shortestDistance) continue

      // If this is the new shortest distance, replace list of shortest distance holders and shortest distance
      if(distance < grid[point].shortestDistance) {
        grid[point].shortestDistance = distance
        grid[point].closestPoints = [coords[coord]]
      }

      // If this distance is equal to some previous one, push coordinate to list (if not in there already)
      if(distance === grid[point].shortestDistance) {
        if(!grid[point].closestPoints.includes(coords[coord])) grid[point].closestPoints.push(coords[coord])
      }
    }
  }

  // Go through all the border coordinates to eliminate data points that spread out into infinity
  const toInfinity = []
  for(point in grid) {
    // If this is a border coordinate
    if  (  grid[point].x === minX
        || grid[point].y === minY
        || grid[point].x === maxX
        || grid[point].y === maxY) 
        {
          // If just a single point is closest to this one (no stop from collision -> continues to infinity)
          if(grid[point].closestPoints.length === 1) {
            if(!toInfinity.includes(grid[point].closestPoints[0])) toInfinity.push(grid[point].closestPoints[0])
          }
        }
  }
  // Go through all points to check if they are at a border coordinate
  for(coord in coords) {
    if  (  coords[coord].x === minX
        || coords[coord].y === minY
        || coords[coord].x === maxX
        || coords[coord].y === maxY) 
      {
        if(!toInfinity.includes(coords[coord])) toInfinity.push(coords[coord])
      }
  }
  // Remove points from coord list that go to infinity
  const filteredCoords = coords.filter(coord => !toInfinity.includes(coord))
  // Finally go through each coordinate from the data point and calculate sum of closest distances to other points
  let largestSum = 0
  for(coord in filteredCoords) {
    let sum = 0
    for(point in grid) {
      if(grid[point].closestPoints.length > 0) {
        if(grid[point].closestPoints.length === 1 && grid[point].closestPoints.includes(filteredCoords[coord])) {
          sum++
        }
      }
    }

    if(sum > largestSum) largestSum = sum
  }
  console.log(largestSum) // <-- this should be the result
}

function calculateDistance(point1, point2) {
  const distX = point1.x > point2.x ? point1.x - point2.x : point2.x - point1.x
  const distY = point1.y > point2.y ? point1.y - point2.y : point2.y - point1.y

  return distX + distY
}
