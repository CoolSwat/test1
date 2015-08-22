var Agent = require('socks5-http-client/lib/Agent');
var request = require('request')
var fs = require('fs')
request({
    url: 'http://www.pepperfry.com/mark-home-aqua-color-cotton-2-single-bed-sheets-n-2-pillow-covers-1197983.html',
    proxy:'http://52.74.116.189:3128'
}, function(err, res) {
  // console.log(res);
 //  console.log(err);
 // console.log(res.request.uri.href);
fs.writeFile('outpt.txt',res.body)

});