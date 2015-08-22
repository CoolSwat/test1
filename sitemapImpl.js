var Crawler = require("./lib/crawlingImpl");
var url = require('url');
var _=require('underscore')
var es=require("./estest");
var fs=require('fs')
var q= require('q')
var query;
var logger = require("./lib/w-logger");
 

var qhasDrained=false
var c;
function processQuery($,query){
    logger.info('Processing to structure the data')
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
exports.startCrawling=function startCrawling(linksArr,objquery,xmlName){
   var deferred=q.defer();
   var dataArr=[];
    query=objquery
c = new Crawler({
    maxConnections : 5,
	//rateLimits :5000,
    userAgent:'Googlebot/2.1 (+http://www.googlebot.com/bot.html)',
	//proxies:['http://14.139.172.170:3128'],
    debug:true,
    onDrain:function(){
    logger.warn('Cque is drained')
    deferred.resolve(dataArr)
    },
    callback : function (error, result, $) {
        if(error){
            logger.error("data not crawled"+JSON.stringify(result))
          
        }
        else{
            logger.info("Data crawled for uri"+result.uri)
			console.log("Data crawled for uri"+result.uri)
            query.url=result.uri;
             var processedData= processQuery($,query)
			 console.log(processedData)
			 dataArr.push(processedData)
       //     var indexMetaData= { index:  { _index: "pepperfry_proxy", _type: 'test' } }
        //     indexer({"indexMetaData":indexMetaData,"processedData":processedData})
        }
    }
});
try{
c.queue(linksArr); 
}
    catch(e){
        logger.error('querue error'+e)
        }
  return deferred.promise; 
}

function getLastExistingUrl(fileName){
    var deferred=q.defer();
es.client.search({
"index":'fl-index-'+fileName,
"body":{"query":{"match_all":{}},"size":1,"fields":["url"],"sort":[{"_timestamp":{"order":"desc"}}]}
},function(err, response, status){
deferred.resolve(response.hits.hits[0].fields.url[0])
}
)
return deferred.promise;
}
var bklArr=[];
function indexer(data){
    bklArr.push(data.indexMetaData)
    bklArr.push(data.processedData)
    if(bklArr.length >= 200){
       
    es.client.bulk({
                body:bklArr},function(err, response, status){
                 if(err)
                 {
                 logger.error('ES error'+ err)
                 throw new Error('herroe')
                 }
                 else
                 logger.info("data is inserted in the index")
                 
                })
    
    bklArr=[]
    }
}

exports.checkExistingData=function(fileName,linkArr){
 var deferred=q.defer();
es.client.count({
"index":'fl-index-'+fileName
},function(err, response, status){
    if(!response.count){
        deferred.resolve(
            {dataExists:false}
        )
    }
else if(linkArr.length==response.count){
deferred.resolve(
    {dataExists:true, doNotProcess:true}
)
}
    else {
        getLastExistingUrl(fileName).then(function(url){
            console.log(linkArr.indexOf(url))
            var index=linkArr.indexOf(url)
            var reducedArr=linkArr.splice(index,linkArr.length-index )
            deferred.resolve(
            {dataExists:true, reducedArr:reducedArr}
            )
        })
    }
}
)
return deferred.promise;
}
exports.createIndex=function(fileNmae){
    var deferred=q.defer();
es.client.indices.create({
"index":"fl-index-"+fileNmae,
"body":{
    "settings" : {
        "number_of_shards" : 5,
        "number_of_replicas" : 0
    },
    "mappings" : {
        "test" : {
            "_source" : { "enabled" : true },
            "_timestamp": { "enabled" : true },
            "properties" : {
                "field1" : { "type" : "string", "index" : "not_analyzed" }
            }
        }
    }
}},function(err, response, status){

deferred.resolve()
}
)
return deferred.promise; 
}
exports.killInstance=function(){
delete c;
}
