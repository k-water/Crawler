const superagent = require('superagent')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const sites = 'http://wallpapersafari.com/fate-stay-night-archer-wallpaper/'
const fetchPage = (url) => {
  superagent.get(url).end((err, res) => {
    if (err) {
      return console.log(err)
    }
    let links = []
    let title = []
    let types = []
    let num = 1
    let $ = cheerio.load(res.text, { decodeEntities: false })
    $('.single-img').each((index, item) => {
      num++
    })
    let tmp = $('.post-content .single-img .post-cover img')
    for (let i = 0; i < num - 1; i++) {
      links.push(tmp.eq(i).attr('src'))
      title.push(tmp.eq(i).attr('alt'))
      types.push(tmp.eq(i).attr('src').substr(tmp.eq(i).attr('src').length - 4))
    }
    for (let k = 0; k < links.length; k++) {
      saveImages('../images/', links[k], k, types[k])
    }
    // console.log(JSON.stringify(types, null, 2))
  })
}
const saveImages = (path, url, fileName, types) => {
  request.head(url, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    request(url).pipe(fs.createWriteStream(path + fileName + types))
    console.log('Image Saved')
  })
}
fetchPage(sites)
