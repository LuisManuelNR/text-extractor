#!/usr/bin/env node
const inquirer = require('./src/inquirer')
const file = require('./src/file')

const run = async () => {
  const questionResponse = await inquirer.askQuestions()
  let result
  if (questionResponse.dirOrFile === 'dir') {
    result = await file.extractFromDir(questionResponse.dirOrFilePath, questionResponse.replace)
  } else {
    result = await file.extractFromFile(questionResponse.dirOrFilePath, questionResponse.replace)
  }
  if (result) {
    file.saveJson(questionResponse.targetPath, result)
    console.log('succesfull generated json file')
  } else {
    console.log('No results were found')
  }
}

/*
  questionResponse.dirOrFilePath
  questionResponse.targetPath
  questionResponse.replace
*/

run()
