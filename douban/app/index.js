/**
 * @author Water
 * @time 2017-01-14
 * @description 抓取豆瓣电影top250
 * @url https://movie.douban.com/top250
 * @email 625592890@qq.com
 */

// 抓取模块
const collector = require('./collector')
const targetUrl = 'https://movie.douban.com/top250'
collector.fetchPage(targetUrl)
