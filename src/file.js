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

  extractFromFile (file, wantReplace) {
    return new Promise(resolve => {
      fs.readFile(file, 'utf8', (err, contents) => {
        if (err) throw err
        const filter = /\$\$.*?\$\$/g
        const match = contents.match(filter)
        const result = {}
        let rewritedContent = !wantReplace || `import t from "./source" \n ${contents}`
        if (match) {
          match.map(v => {
            const token = this.generateToken()
            result[token] = v.substr(2, v.length - 4)
            rewritedContent = !wantReplace || rewritedContent.replace(`'${v}'`, `t.${token}`)
          })
          if (wantReplace) this.replaceContent(file, rewritedContent)
        }
        resolve(result)
      })
    })
  },

  extractFromDir (dir, wantReplace) {
    return new Promise(resolve => {
      const fileList = this.walkSync(dir)
      let result = {}
      fileList.map(async (f, i) => {
        result = Object.assign(await this.extractFromFile(f, wantReplace), result)
        if (i === fileList.length - 1) resolve(result)
      })
    })
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
