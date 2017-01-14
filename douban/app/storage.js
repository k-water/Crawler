/**
 * 数据存储
 */
const fs = require('fs')
const request = require('request')
  /**
   * @param {string} path
   * @param {string} page
   * @param {Array} moiveList
   */
const saveData = (path, page, movieList) => {
  fs.appendFile(path + page + '.json', JSON.stringify(movieList, null, 4), 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Data' + page + ' Saved')
  })
}

const saveImages = (path, url, fileName) => {
  request.head(url, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    request(url).pipe(fs.createWriteStream(path + fileName + '.jpg'))
  })
}
exports.saveData = saveData
exports.saveImages = saveImages
