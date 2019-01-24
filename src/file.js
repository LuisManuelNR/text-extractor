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

  extractFromFile (file) {
    fs.readFile(file, 'utf8', (err, contents) => {
      if (err) throw err
      const filter = /\$\$.*?\$\$/g
      const match = contents.match(filter)
      const result = {}
      if (match) {
        match.map(v => {
          const token = this.generateToken()
          result[token] = v.substr(2, v.length - 4)
        })
      }
      console.log('3')
      return result
    })
  },

  extractFromDir (dir) {
    const fileList = this.walkSync(dir)
    let result = {}
    fileList.map(f => {
      result = Object.assign(this.extractFromFile('./' + f), result)
    })
    return result
  },

  replaceContent (file, content) {
    fs.writeFile(file, content, err => {
      if (err) throw err
      console.log('succesfull replaced file')
    })
  },

  saveJson (fileName, content) {
    fs.writeFile(fileName + '.json', JSON.stringify(content), err => {
      if (err) throw err
      console.log('succesfull generated file')
    })
  },

  walkSync (dir, filelist = []) {
    fs.readdirSync(dir).map(file => {
      filelist = fs.statSync(path.join(dir, file)).isDirectory()
        ? this.walkSync(path.join(dir, file), filelist)
        : filelist.concat(path.join(dir, file))
    })
    return filelist
  },

  generateToken () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
}
