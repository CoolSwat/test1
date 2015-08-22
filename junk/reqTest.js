var request=require('request')
request({uri:'http://www.snapdeal.com/sitemap.xml',headers:{'User-Agent':'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
           console.log(body) // Print the google web page.
          }
    console.log(response.statusCode);
            
                console.log(error)
        })