    var request = require('request'),
        zlib = require('zlib'),
        fs = require('fs');

    var qdomain = require("qdomain");
    var parser = require('xml2json');
    var es=require("./estest");

    var linksArr=JSON.parse(fs.readFileSync('./out/flipkart_gzlinks.txt'))
    // Fetch http://example.com/foo.gz, gunzip it and store the results in 'out'
    var extractLinks=function(gzlink){
        if(gzlink){
        var fileName='./tmp/'+gzlink.replace('http://www.flipkart.com/sitemap/','').replace('.gz','')
       var  out = fs.createWriteStream(fileName);
    qdomain(function(defer){
     request(gzlink).pipe(zlib.createGunzip()).pipe(out).on("close", defer.resolve);
    }).then(function(){
        console.log('done')
      //  parseXML(fileName,linksArr.shift())
        extractLinks(linksArr.shift());
        }).fail(function(err){
      // Any IO errors or transform errors will be handled here
      console.log(err)
       extractLinks(linksArr.shift());
    });
    }
    }
    var parseXML=function(fileName,nextlink){
    var xml = fs.readFileSync(fileName);
        var json=parser.toJson(xml)
         es.client.create({index: 'fl-index',
                  type: 'links',
                id:fileName.replace('.xml','').replace('./tmp/',''),
                body:json},function(){
                 console.log('inserted')
                }).then(extractLinks(nextlink))
    }
    extractLinks(linksArr.shift());