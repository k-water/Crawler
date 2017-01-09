/**
 * @author water
 * @date 2017-01-09 17:12:21
 * @description A try for node\
 */
var http = require('http')
var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
var id = 0
var url = 'http://blog.lxstart.net/2016/08/04/javascript/pattern/singleton/'

/**
 * @name fetchPage
 * @param x
 */
function fetchPage(x) {
  startRequest(x)
}
/**
 * @name startRequest
 * @param x
 */
function startRequest(x) {
  // 开启http服务器 向目标网站发起get请求
  http.get(x, function (res) {
    var html = '' // 存储请求网页的整个html内容
    var titles = []
    res.setEncoding('utf-8') // 设置uft8编码 防止中文乱码
      // 监听data事件 每次取一块数据
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      var $ = cheerio.load(html)

      var time = $('.article-date time').html().trim()

      // 文章标题 编写的时间 当前文章的url
      var articles_item = {
        title: $('header.article-header .article-title').text().trim(),
        Time: time,
        link: 'http://blog.lxstart.net' + $('.article-type-post div.article-meta a').attr('href').trim(),
        id: id = id + 1
      }

      // console.log(html)
      console.log(articles_item) // 打印文章信息
      var articles_title = $('header.article-header .article-title').text().trim()
      savedContent($, articles_title)
      savedImg($, articles_title)

      // 下一篇文章的链接
      var nextLink = 'http://blog.lxstart.net' + $('nav#article-nav #article-nav-older').attr('href').trim()
        // 控制爬取文章的篇数
      if (id <= 500) {
        fetchPage(nextLink)
      }
    }).on('error', function (err) {
      console.log(err)
    })
  })
}

function savedContent($, articles_title) {

}

function savedImg($, articles_img) {

}
fetchPage(url)
