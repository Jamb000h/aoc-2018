/* Boilerplate */
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
})

const data = []
const alphabetTimeMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26
}

let time = 0

rl.on('line', (line) => {
  data.push(line)
}).on('close', () => calculateStepOrder(data))

/* Solution */

function calculateStepOrder(data) {

  const stepData = {
    doneOrder: [],
    stepsNotDone: new Set(),
    requirements: [],
    stepsInWork: []
  }

  let freeWorkers = 5
  
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

    // Increase each the time worked on by one for each step that is being worked on
    for(let i = stepData.stepsInWork.length - 1; i >= 0; i--) {
      stepData.stepsInWork[i].time += 1
      // And delete from list if done
      if(stepData.stepsInWork[i].time >= alphabetTimeMap[stepData.stepsInWork[i].step] + 60) {
        stepData.doneOrder.push(stepData.stepsInWork[i].step)
        stepData.stepsNotDone.delete(stepData.stepsInWork[i].step)
        stepData.stepsInWork.splice(i, 1)
        freeWorkers += 1
      }
    }

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
        let notWorkedOn = true
        for(let i = 0; i < stepData.stepsInWork.length; i++) {
          if(stepData.stepsInWork[i].step === step) {
            notWorkedOn = false
          }
        }
        if(notWorkedOn) {
          readySteps.push(step)
        }
      }

    }

    if (readySteps.length === 0 && stepData.stepsInWork.length === 0) {
      break
    }

    time += 1

    while(freeWorkers > 0 && readySteps.length > 0) {
      // From the steps that are ready to be done, do the first one alphabetically
      const stepToDo = readySteps.sort((a, b) => {
        // descending sort
        return a > b ? 1 : -1
      })[0]
      console.log("Assigning ", stepToDo, ", workers left: ", freeWorkers)
      stepData.stepsInWork.push({
        step: stepToDo,
        time: 0
      })
      freeWorkers -= 1
      readySteps.shift()
    }
  }

  console.log(time)

}

function parseLine(line) {
  return {
    enabler: line.substr(5, 1),
    enables: line.substr(36, 1)
  }
}