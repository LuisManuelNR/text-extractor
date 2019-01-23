const fs = require('fs')
const path = require('path')

module.exports = {
  getCurrentDirectoryBase () {
    return path.basename(process.cwd())
  },

  directoryExists (filePath) {
    try {
      return fs.statSync(filePath).isDirectory()
    } catch (err) {
      return false
    }
  },

  extractFromFile (file, target, replaceContent) {
    fs.readFile(file, 'utf8', (err, contents) => {
      if (err) throw err
      const filter = /\$\$.*?\$\$/g
      const match = contents.match(filter)
      const result = {}
      let rewritedContent = !replaceContent || `import t from "${target}" \n ${contents}`
      match.map(v => {
        const token = this.generateToken()
        result[token] = v.substr(2, v.length - 4)
        rewritedContent = !replaceContent || rewritedContent.replace(`'${v}'`, `t.${token}`)
      })
      fs.writeFile(target + '.json', JSON.stringify(result), err => {
        if (err) throw err
        console.log('succesfull generated file')
      })
      if (replaceContent) {
        fs.writeFile(file, rewritedContent, err => {
          if (err) throw err
          console.log('succesfull replaced file')
        })
      }
    })
  },

  generateToken () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
}
