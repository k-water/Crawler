/**
 * @author water
 */
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const saveData = (path, page, movieList) => {
  fs.appendFile(path + page + '.json', JSON.stringify(movieList, null, 4), 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Data' + page + ' Saved')
  })
}

let accepted = []
let info
let ojUrl = [
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1018',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1065',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1071',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1115',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1141',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1162',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1212',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1220',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1492',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1593',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1701',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1722',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1798',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1840',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=1999',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2036',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2080',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2086',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2089',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2105',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2108',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2134',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2303',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2393',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2438',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2529',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2547',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2548',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2552',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2554',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2601',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2603',
  'http: //acm.hdu.edu.cn/showproblem.php?pid=2701'
]


for (let i = 0, len = ojUrl.length; i < len; i++) {
  superagent.get(ojUrl[i]).end(
    (err, res) => {
      if (err) {
        return console.log(err)
      }
      let $ = cheerio.load(res.text, { decodeEntities: false })
      let str = $('span').eq(0).text()
      let posTotal = str.indexOf('Accepted Submission(s):')
      let posAccepted = str.indexOf('Total Submission(s):')
      info = {
        accepted: parseInt(str.slice(posTotal + 24)),
        total: str.slice(posAccepted + 21, posTotal - 24),
        id: ojUrl[i].slice(ojUrl[i].indexOf('?') + 5)
      }
      accepted.push(info)
      if (i === ojUrl.length - 1) {
        saveData('./app/data/', 'math', accepted.sort(function (a, b) {
          if (a.accepted > b.accepted) {
            return -1
          }
          if (a.accepted < b.accepted) {
            return 1
          }
          return 0
        }))
      }
    }
  )
}




/**
 *  // superagent.get('http://www.pythontip.com/acm/problemCategory').end(
//   (err, res) => {
//     if (err) {
//       return console.log(err)
//     }
//     let $ = cheerio.load(res.text, { decodeEntities: false })
//     for (let i = 600; i < 1000; i++) {
//       console.log($('span.span1').find('a').eq(i).attr('href'))
//     }
//   }
// )
 */
