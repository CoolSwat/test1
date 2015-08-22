//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/sosdb');
var q=require('q');

exports.insertSiteMap=function insertSiteMap(data){
    var deferred=q.defer();
/*var Schema = mongoose.Schema;

var siteMapSchema = new Schema({
  url:  String,
  level: Number,
  type: String
});

var siteMap = mongoose.model('siteMap', siteMapSchema);
//if(!siteMap)
//siteMap=mongoose.model('siteMap', siteMapSchema);


siteMap.collection.insert(data,function(err){
    if(err)
    console.log(err)
    else
    console.log('inserted')
    
    deferred.resolve()
}) */



return deferred.promise;
}
