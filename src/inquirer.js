const inquirer = require('inquirer')

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        name: 'dirOrFile',
        type: 'list',
        message: 'Do you want to extract text from a file or from a directory?',
        choices: ['dir', 'file'],
        default: 'file'
      },
      {
        name: 'dirOrFilePath',
        type: 'input',
        message: `type the path and file name you want to extract, (example: path/to/file.js)
          if dir is selected, no need a file name (example: path/to/dir/)`,
        validate: value => {
          if (value.length) {
            return true
          } else {
            return 'Missing path.'
          }
        }
      },
      {
        name: 'targetPath',
        type: 'input',
        message: 'Where do you want to save the extracted text? default:',
        default: './source'
      },
      {
        name: 'replace',
        type: 'confirm',
        message: 'Do you want to replace matched text with the generated tokens?'
      }
    ]
    return inquirer.prompt(questions)
  }
}
