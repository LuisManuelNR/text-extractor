#!/usr/bin/env node
const file = require('./src/file')

const run = async () => {
  console.log('current folder is: ', file.getCurrentDirectoryBase())
}

run()