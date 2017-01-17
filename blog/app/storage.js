/**
 * Storage.js
 */
var fs = require('fs')
var request = require('request')
var https = require('https')

function saveImages(path, url, fileName) {
  var subStr = url.substr(url.length - 4)
  request.head(url, function (err, res, body) {
    if (err) {
      return console.log(err)
    }
    request(url).pipe(fs.createWriteStream(path + fileName + subStr))
  })
}

function savedContent($, articlesTitle) {
  var text = $('.article-entry').html().trim()
  fs.appendFile('./app/data/' + articlesTitle + '.html', text, 'utf-8', function (err) {
    if (err) {
      console.log(err)
    }
  })
}

function saveImagesHttps(path, url, fileName) {  
  var subStr = url.substr(url.length - 4)
  https.get(url, function (res) {
    var data = ''
    res.setEncoding('binary')

    res.on('data', function (chunk) {
      data += chunk
    })
    res.on('end', function () {
      fs.appendFile(path + fileName + subStr, data, 'binary', function (err) {
        if (err) {
          console.log(err)
        }
      })
    })
  }).on('error', function (err) {
    console.log(err)
  })
}
exports.savedContent = savedContent
exports.saveImages = saveImages
exports.saveImagesHttps = saveImagesHttps
