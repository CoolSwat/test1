var Q  = require('q');
var fs=require("fs");
var files=fs.readdirSync('../out');
var crawler=require('./crawler')
var es=require("../estest");
var xml2object = require('xml2object');
var _=require('underscore')

var getLinks=function(file){
     if(!file)
    return false;
    extractLinks(file).then(function(links){
        console.log(links.length)
         //   processLinks(links)
        fs.writeFile('links.txt',JSON.stringify(links))
    })
    
}

var extractLinks=function(filename){
    var deferred=Q.defer()
    var source = fs.createReadStream('../out/'+filename);

var parser = new xml2object([ 'loc' ], source);
var linkArr=[]
// Bind to the object event to work with the objects found in the XML file
parser.on('object', function(name, obj) {
   // console.log('Found an object: %s', name);
    linkArr.push({url:obj['$t']})
    
    //console.log(obj);
});

// Bind to the file end event to tell when the file is done being streamed
parser.on('end', function() {
   // console.log('Finished parsing xml!');
    console.log(linkArr.length)
    deferred.resolve(linkArr);
});

// Start parsing the input stream
parser.start();
return deferred.promise;
}

var query={
    "url": "http://www.flipkart.com/zeeshaan-contemporary-printed-analog-wall-clock/p/itmeyyresnkhgwf7",
    "type": "html",
    "map": {
        "title": {
            "selector": ".section.omniture-field .title",
            "extract": "text"
        },
        "price": {
            "selector": ".top-section .selling-price",
            "extract": "text"
        },
        "image":{
          "selector":".productImage",
          "extract":"data-src"
        },
        "category":{
          "selector":"#fk-mainbody-id ul a.link",
          "extract":"text"
          
        },
        "details":{
          "selector":".description-text",
          "extract":"text"
        }
    }
}

var process=function(link){
  var deferred=Q.defer()
  var queryP=_.extend({},query)
  queryP.url=link
crawler.getQuery(link,queryP).then(function (results) {
  console.log(results)
deferred.resolve()

}).fail(deferred.resolve()); 
return deferred.promise;
}

var dataProcessor=function(data,queryP){
  var processedData={}
  processedData.url=queryP.url;
  processedData.category=1234;
  processedData.image=data.image[0]
  processedData.price=data.price[0].replace("Rs. ","")
  processedData.title=data.title[0]
  processedData.details=data.details[0]
  processedData.logo='sss'
  
  return processedData;
}
//process=qlimit.limitConcurrency(process, 2);
var splitArr=function(batchSize,linkArr){
    
var n = batchSize;
var lists = _.groupBy(linkArr, function(element, index){
  return Math.floor(index/n);
});
lists = _.toArray(lists);
    return lists;
}
var iteration=function(miniArr){
    var promise=[]
     miniArr.forEach(function(link){
           promise.push(process(link.url))
       })
    return promise;
}

var processLinks = function(links,callback){
 /*  var spliietdArr= splitArr(10000,links)
   var arr=spliietdArr.shift();
    var iterator=0;
  function tmp(arr){
      console.log(iterator++)
        Q.all(iteration(arr)).then(function(){
            var ab=spliietdArr.shift();
            if(ab)
            tmp(iteration(ab))
        })
   }
   tmp(arr) */
   // launcher(links)
    links.forEach(function(link){
        console.log(link.url)
    process(link.url)
    })
}
var running = 0;
var limit = 2;
function launcher(links) {
  while(running < limit && links.length > 0) {
    var item = links.shift();
    process(item.url, function(result) {
      console.log(result);
      running--;
      if(links.length > 0) {
        launcher();
      } else if(running == 0) {
        console.log('done')
      }
    });
    running++;
  }
}
getLinks(files.shift());

