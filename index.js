#!/usr/bin/env node
const inquirer = require('./src/inquirer')
const file = require('./src/file')

const run = async () => {
  const questionResponse = await inquirer.askQuestions()
  if (questionResponse.dirOrFile === 'dir') {
    console.log('dir selected, (not implemented yet)')
  } else {
    file.extractFromFile(
      questionResponse.dirOrFilePath,
      questionResponse.targetPath,
      questionResponse.replace)
  }
  // file.extractFromFile('./test/pcp-holder.component.ts', './source.json')
}

run()
