var q=require('q');
var es=require("./estest");

exports.insertSiteMap=function insertSiteMap(data,cawlConfig){
    var deferred=q.defer();
    var bulkArr=[];
var indexMetaData= { index:  { _index: cawlConfig.indexName, _type: 'sitemap' } }
 data.forEach(function(link){
    var tmpObj={};
    tmpObj.url=link
    tmpObj.level=cawlConfig.sitemap.level
    tmpObj.type=cawlConfig.sitemap.type
    bulkArr.push(indexMetaData)
    bulkArr.push(tmpObj)
 })

 es.client.bulk({
                body:bulkArr},function(err, response, status){
                 if(err)
                 {
                 console.log(err)
                 }
                 else
                 console.log("data is inserted in the index")
                 
                 deferred.resolve()
                })
return deferred.promise;
}
