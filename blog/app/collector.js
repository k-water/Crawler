/**
 * 爬取模块
 */
var http = require('http')
var cheerio = require('cheerio')
var storage = require('./storage.js')
var id = 0

/**
 * @name fetchPage
 * @param options
 */
function fetchPage(options) {
  startRequest(options)
}
/**
 * @name startRequest
 * @param options
 */
function startRequest(options) {
  var site = 'http://blog.lxstart.net'
    // 开启http服务器 向目标网站发起get请求
  http.get(options, function (res) {
    var html = '' // 存储请求网页的整个html内容
    res.setEncoding('utf-8') // 设置uft8编码 防止中文乱码
      // 监听data事件 每次取一块数据
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      var $ = cheerio.load(html, { decodeEntities: false })
      var arrPic = []

      var regHttps = /^((https)?:\/\/)[^\s]+/
      $('.body-wrap img').each(function () {
        var that = $(this)
        var src = that.attr('src')
        var imgSrc = ''
        if (regHttps.test(src)) {
          imgSrc = src
        } else {
          imgSrc = site + that.attr('src')
        }
        arrPic.push(imgSrc)
      })
        // 文章标题 编写的时间 当前文章的url
      var articlesItem = {
        title: $('header.article-header .article-title').text().trim(),
        Time: $('.article-date time').html().trim(),
        link: site + $('.article-type-post div.article-meta a').attr('href'),
        pic: arrPic,
        id: id = id + 1
      }

      console.log(JSON.stringify(articlesItem, null, 4)) // 打印文章信息 http服务器
        // 保存文章内容
      storage.savedContent($, articlesItem.title)
        // 保存图片
      var nameImg = 0
      for (var i = 0, len = arrPic.length; i < len; i++) {
        if (regHttps.test(arrPic[i])) {
          storage.saveImagesHttps('./app/images/', arrPic[i], ++nameImg)
        } else {
          storage.saveImages('./app/images/', arrPic[i], ++nameImg)
        }
      }

      // 下一篇文章的链接
      var nextLink = site + $('nav#article-nav #article-nav-older').attr('href')
        // 控制爬取文章的篇数
      if (id <= 500) {
        fetchPage(nextLink)
      }
    }).on('error', function (err) {
      console.log(err)
    })
  })
}

exports.fetchPage = fetchPage
