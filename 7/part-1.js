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
}).on('close', () => calculateStepOrder(data))

/* Solution */

function calculateStepOrder(data) {

  const stepData = {
    doneOrder: [],
    stepsNotDone: new Set(),
    requirements: []

  }
  
  for(let i = 0; i < data.length; i++) {

    const line = parseLine(data[i])
    stepData.stepsNotDone.add(line.enabler)
    stepData.stepsNotDone.add(line.enables)
    
    if (stepData.requirements[line.enables] === undefined) {
      stepData.requirements[line.enables] = [line.enabler]
    } else {
      stepData.requirements[line.enables].push(line.enabler)
    }
  }

  while(true) {

    const readySteps = []
    // Find all steps that are ready
    for(let step of stepData.stepsNotDone) {

      ready = true

      if(stepData.requirements[step] !== undefined) {
        for(let i = 0; i < stepData.requirements[step].length; i++) {
          if(stepData.stepsNotDone.has(stepData.requirements[step][i])) {
            ready = false
          }
        }
      }

      if(ready) {
        readySteps.push(step)
      }

    }

    if (readySteps.length === 0) {
      break
    }

    // From the steps that are ready to be done, do the first one alphabetically
    const stepToDo = readySteps.sort((a, b) => {
      // descending sort
      return a > b ? 1 : -1
    })[0]

    stepData.doneOrder.push(stepToDo)
    stepData.stepsNotDone.delete(stepToDo)
  }

  console.log(stepData.doneOrder.join(""))

}

function parseLine(line) {
  return {
    enabler: line.substr(5, 1),
    enables: line.substr(36, 1)
  }
}