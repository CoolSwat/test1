var Q           = require('q');
var noodle = require('../lib/noodle');
var dbUtil=require("../dbutil");
var fs=require("fs");
var files=fs.readdirSync('../out');
var xml2object = require('xml2object');

var db=  new dbUtil();
db.initDB().then(function(){
 console.log('init')
})

var getLinks=function(file){
     if(!file)
    return false;
    extractLinks(file).then(function(links){
        console.log(links.length)
        
       processLinks(links.shift(),links)
            //   getLinks(files.shift())
    })
    
}
var processLinks = function(link, links){
    process(link.url).then(function(){
    processLinks(links.shift().url)
    });
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
  query.url=link
noodle.query(query).then(function (results) {
  //console.log(JSON.stringify(results));
  var data=results.results[0].results;
  
  var dataArr=[];
  dataArr.push(dataProcessor(data))
   db.insertData(data,function(){
   deferred.resolve()
   });
}); 
return deferred.promise;
}

var dataProcessor=function(data){
  var processedData={}
  processedData.url=query.url;
  processedData.category=1234;
  processedData.image=data.image[0]
  processedData.price=data.price[0].replace("Rs. ","")
  processedData.title=data.title[0]
  processedData.details=data.details[0]
  processedData.logo='sss'
  
  return processedData;
}

getLinks(files.shift());