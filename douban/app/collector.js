/**
 * 抓取模块
 */

// 变量
let id = 0
let num = 0

// 引进模块
const superagent = require('superagent')
const cheerio = require('cheerio')
const storage = require('./storage')
  /**
   * @param {string} url
   */
const fetchPage = (url) => startPage(url)
  /**
   * @param {string} url
   */
const startPage = (url) => superagent.get(url).end(
  (err, res) => {
    if (err) {
      return console.error(err)
    }
    let movieList = []
    let $ = cheerio.load(res.text, { decodeEntities: false })
    let nextLink = 'https://movie.douban.com/top250' + $('span.next a').attr('href')
    let page = $('.paginator .thispage').text()
    for (let i = 0; i < 25; i++) {
      let tmp = $('.grid_view li').eq(i).children().children().next()
      let starring = tmp.find('div.bd p').eq(0).text().trim().split('&nbsp')[3].trim().split(':')[1]
      let info = {
        movieName: tmp.find('div.hd span').eq(0).text().trim(),
        director: tmp.find('div.bd p').eq(0).text().trim().split('&nbsp')[0].split(':')[1].trim(),
        starring: starring,
        link: tmp.find('div.hd a').attr('href'),
        quote: tmp.find('div.bd .inq').text().trim(),
        score: tmp.find('div.bd .star .rating_num').text().trim(),
        image: tmp.prev().find('a img').attr('src'),
        num: ++num
      }
      movieList.push(info)

      // 保存图片
      storage.saveImages('./app/images/', info.image, info.movieName)
        // 展示简要信息
        // console.log(JSON.stringify(info, null, 2))
    }
    console.log(JSON.stringify(movieList, null, 4))

    // 保存电影信息
    storage.saveData('./app/data/', page, movieList)
      // 抓取250条信息 每页25条
    id++
    if (id < 10) {
      fetchPage(nextLink)
    }
  }
)
exports.fetchPage = fetchPage
