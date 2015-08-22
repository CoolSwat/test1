var q       = require('q'),
    _ = require("underscore")
    request=require('request')
    fs=require('fs')
    cheerio = require('cheerio');
    
exports.config = JSON.parse(fs.readFileSync('../lib/config.json'));
exports.getQuery=getQuery
exports.extractData=extractData
var iterator=0;
function getQuery(url,query){
    
    var deferred=q.defer()
   
fetchBody(url,query).then(function(body){
           var opArr= processQuery(body,query)
            if(iterator==170)
        debugger;
          console.log('doing===='+iterator++)
            deferred.resolve(opArr)             
    },console.error)
return deferred.promise
}
function processQuery(body,query){
    console.log('processing')
    var opArr=[]
    try{
   var $ = cheerio.load(body)
   
   _(query.map).map(function(item,key){
       var tmpObj= {}
       tmpObj[key]=arrExtractor($,item)
        opArr.push(tmpObj)
   })
    }
    catch(err){
        console.log(err)
    }
   return opArr
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
function fetchBody(url,query) {
  var header;
  if(query.requestHeader){
    header=query.requestHeader;
  }
  else{
    header= {'user-agent': exports.config.userAgent}
  }
  var deferred       = q.defer(),
      requestOptions = {
        method: 'GET',
        uri: url,
        headers: header
      };

  if (query.post) {
    requestOptions.method = 'POST';
    requestOptions.body   = serialize(query.post);
  }

  request(requestOptions, function (err, response, body) {
     
    if (err || response.statusCode !== 200) {
         console.log("err"+url)
      deferred.reject(new Error('Document not found'));
    } else {
      console.log("success"+url)
      deferred.resolve(body,query);
    }
  });

  return deferred.promise;
};

