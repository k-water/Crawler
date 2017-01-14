/**
 * Storage.js
 */
var fs = require('fs')
var request = require('request')

function saveImages(path, url, fileName) {
  var subStr = url.substr(url.length - 4)
  request.head(url, function (err, res, body) {
    if (err) {
      return console.log(err)
    }
    request(url).pipe(fs.createWriteStream(path + fileName + subStr))
    console.log('Image Saved')
  })
}
exports.saveImages = saveImages

function savedContent($, articlesTitle) {
  var text = $('.article-entry').html().trim()
  fs.appendFile('./app/data/' + articlesTitle + '.html', text, 'utf-8', function (err) {
    if (err) {
      console.log(err)
    }
    console.log('保存完成')
  })
}

exports.savedContent = savedContent