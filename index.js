#!/usr/bin/env node
const inquirer = require('./src/inquirer')
const file = require('./src/file')

const run = async () => {
  const questionResponse = await inquirer.askQuestions()
  if (questionResponse.dirOrFile === 'dir') {
    console.log(file.extractFromDir(questionResponse.dirOrFilePath))
  } else {
    file.extractFromFile(questionResponse.dirOrFilePath)
  }
  // file.extractFromFile('./test/pcp-holder.component.ts', './source.json')
}

/*
  questionResponse.dirOrFilePath
  questionResponse.targetPath
  questionResponse.replace
*/

run()
