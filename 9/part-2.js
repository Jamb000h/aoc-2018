const players = 493
const lastValue = 7186300
const elfScores = {}
let elf = 1
let currentNode = null
let marbleValue = 1

const startNode = newNode(0)
currentNode = startNode
currentNode.next = startNode
currentNode.prev = startNode

while(true) {
  if(marbleValue % 23 !== 0) {
    insertAfter(currentNode.next, newNode(marbleValue))
    currentNode = currentNode.next.next
  } else if (marbleValue > 0) {
    // Score!
    let marbleScore = currentNode.prev.prev.prev.prev.prev.prev.prev.data
    elfScores[elf] = elfScores[elf] === undefined ? marbleScore + marbleValue : elfScores[elf] + marbleScore + marbleValue
    remove(currentNode.prev.prev.prev.prev.prev.prev.prev)
    currentNode = currentNode.prev.prev.prev.prev.prev.prev
  }

  if(marbleValue === lastValue) {
    break
  }

  marbleValue += 1
  elf += 1
  if(elf > players) {
    elf = 1
  }
}

console.log(Math.max(...Object.values(elfScores))) // <- This should be the result

function newNode(data) {
  return {
    next: null,
    prev: null,
    data
  }
}

function insertAfter(node, newNode) {
  newNode.prev = node
  newNode.next = node.next
  node.next.prev = newNode
  node.next = newNode
}

function remove(node) {
  node.prev.next = node.next
  node.next.prev = node.prev
}