var Crawler = require("./lib/crawlingImpl");
var url = require('url');
var _=require('underscore')
var es=require("./estest");
var fs=require('fs')
var i=0;
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
var c = new Crawler({
    maxConnections : 10,
    userAgent:'request',
    
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        if(error){
            console.log('not ok=='+i++)
          
        }
        else{
            console.log('ok=='+i++)
            query.url=result.uri;
             var processedData= processQuery($,query)
             es.client.create({index: 'fl-index',
                  type: 'test',
                body:processedData},function(){
                 console.log('inserted')
                })
        }
    }
});

function processQuery($,query){
    console.log('processing')
    var tmpObj= {};
    tmpObj.url=query.url
    try{
   _(query.map).map(function(item,key){ 
       tmpObj[key]=arrExtractor($,item)
   })
    }
    catch(err){
        console.log(err)
    }
   return tmpObj
}
function arrExtractor($,obj){
var property=obj.extract,
    selector=obj.selector;
    opArrr=[];
    $(selector).each(function(i){
        opArrr.push(extractData($,this,obj))
    })
    if(opArrr.length>1)
        return opArrr
    else
        return opArrr[0]
}
function extractData($,ele,obj){
    var property=obj.extract,
        selector=obj.selector;
if (property === 'text') {
    return $(ele).text().replace(/(\r\n|\n|\r|\t)/gm, "").trim();
  }
  else if (property === 'html' || property === 'innerHTML') {
    return $(ele).html();
  }
  else {
    return $(ele).attr(property);
  }
}
var linksArr=JSON.parse(fs.readFileSync('./out/2oq_2014-10-26_0.txt'))
// Queue just one URL, with default callback
c.queue(linksArr);