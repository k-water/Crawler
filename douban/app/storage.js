const fs = require('fs')
const saveData = (path, page, movieList) => {
  fs.appendFile(path + page + '.json', JSON.stringify(movieList, null, 4), 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Data' + page + ' Saved')
  })
}
exports.saveData = saveData
