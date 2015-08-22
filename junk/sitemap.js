var Q            = require('q'),
    fs           = require('fs'),
    events       = require('events'),
    request      = require('request'),
    zlib = require('zlib'),
    out = fs.createWriteStream('sitemaplinks.xml'),
    xml2object = require('xml2object');
    
    var getSitemap=function(url){
        var deferred = Q.defer();
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            deferred.resolve(body) // Print the google web page.
          }
        })
       return deferred.promise;
    }
  //  request('http://www.flipkart.com/sitemap/sitemap_index.xml').pipe(zlib.createGunzip()).pipe(out)
    getSitemap('http://www.snapdeal.com/sitemap/sitemap.xml').then(function(body){
        var deferred = Q.defer();
        fs.writeFile("snapdeal-sitemapMain.xml", body, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('adgau')
                    deferred.resolve( "The file was saved!");
                }
            });
        return deferred.promise;
    }).then(function(x){
         var parser = new xml2object([ 'loc' ], 'sitemapMain.xml');
         var linkArr= [];
          parser.on('object', function(name, obj) {
           linkArr.push(obj['$t'])
        });
        parser.on('end', function() {
            console.log('Finished parsing xml!');
             console.log(linkArr)
           // extractgZ(linkArr[0]).then(function(re){console.log(re)})
          extractgZ(linkArr[1])
        });
        parser.start()
    })
    
    var parseSitemap=function(){
        var parser = new xml2object([ 'loc' ], 'sitemapMain.xml');
        var linkArr= [];
        parser.on('object', function(name, obj) {
    //console.log('Found an object: %s', name);
           // extractgZ(obj['$t']);
           linkArr.push(obj['$t'])
        });
        return {parser:parser, linkArr:linkArr};
    }
    
    var extractgZ=function(link){
        request(link, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            zlib.gunzip(body, function(err, dezipped) {
            console.log(dezipped.toString());
        });
          }
        })
    }