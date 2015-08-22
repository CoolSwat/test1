var mongoose = require('mongoose');

var fs=require('fs')
var mongoosePaginate = require('mongoose-paginate');
var q=require('q');

var mongoUtil = function(hostname,dbName, modelName, schema){
	var mongo=this;
	mongoose.connect('mongodb://'+hostname+'/'+dbName);
	
	mongo.sitemapSchema=mongoose.Schema({
    loc: {type:String,unique:true},
	lastmod : Date,
	depth : Number,
	created_at: { type: Date, default: Date.now },
	process_status :{type:Number, default:0}
})
	mongo.urlSchema=mongoose.Schema({
    loc: {type:String,unique:true},
	lastmod : Date,
	depth : Number,
	created_at: { type: Date, default: Date.now },
	process_status :{type:Number, default:0}
})
	mongo.dataSchema=mongoose.Schema({
    url: {type:String,unique:true},
	created_at: { type: Date, default: Date.now },
	process_status :{type:Number, default:0}
},{strict:false})

	mongo.sitemapSchema.plugin(mongoosePaginate)
	mongo.objSiteMapModel=mongoose.model('sitemap_'+modelName,mongo.sitemapSchema)
	
	mongo.urlSchema.plugin(mongoosePaginate)
	mongo.objUrlModel=mongoose.model('url_'+modelName,mongo.urlSchema)
	
	
	mongo.dataSchema.plugin(mongoosePaginate)
	mongo.objDataModel=mongoose.model('data_'+modelName,mongo.dataSchema)
}
mongoUtil.prototype.insertSiteMapUrls=function(objArr){
var mongo = this;
var deferred = q.defer();
mongo.objSiteMapModel.create(objArr, onInsert);

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
	deferred.resolve()
        console.info('%d potatoes were successfully stored.', docs.length);
    }
}
return deferred.promise;
}

mongoUtil.prototype.insertActualUrls=function(objArr){
var mongo = this;
var deferred = q.defer();
mongo.objUrlModel.create(objArr, onInsert);

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
		deferred.resolve()
    } else {
	deferred.resolve()
        console.info('%d potatoes were successfully stored.', docs.length);
    }
}
return deferred.promise;
}

mongoUtil.prototype.insertData=function(data){
var mongo = this;
var deferred = q.defer();
mongo.objDataModel.create(data, onInsert);

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
		deferred.resolve()
    } else {
	deferred.resolve()
        console.info('%d potatoes were successfully stored.', docs.length);
    }
}
return deferred.promise;
}


mongoUtil.prototype.findAll=function(iterator,pagesize,callback){
var mongo = this;
var deffered= q.defer()
mongo.objUrlModel.paginate({process_status:0}, iterator, pagesize, function(error, pageCount, paginatedResults, itemCount) {
  if (error) {
    console.error(error);
	deffered.resolve(paginatedResults)
  } else {
    console.log('Pages:', iterator);
    //console.log(paginatedResults);
	deffered.resolve(paginatedResults)
	if(callback)
	callback(paginatedResults)
  }
});
return deffered.promise;
}

mongoUtil.prototype.documentCount=function(callback){
	var deferred=q.defer();
	var mongo=this;
	mongo.objUrlModel.count({},function(err,count){
		deferred.resolve(count)
		if(callback)
		callback(count);
		})
	return deferred.promise
}

mongoUtil.prototype.updateProcessingStatus = function updateProcessingStatus(idArr){
var deferred=q.defer();
var mongo=this;
//var bulk = mongo.objUrlModel.collection.initializeOrderedBulkOp();
//    bulk.find({'_id': {$in: idArr}}).update({$set: {process_status: 2}});
//    bulk.execute(function (error) {
    mongo.objUrlModel.update({'_id': {$in: idArr}},{$set: {process_status: 2}},{multi:true},function(){
        
	deferred.resolve('updated')
})
		//if(!error)
       //  console.log('updated')                   
  //  });
	return deferred.promise
}

mongoUtil.prototype.updateStatusOfAll = function(status){
    var mongo=this;
mongo.objUrlModel.update({}, {$set: {process_status: status}}, {multi: true}, function(err) { 
    if(!err)
        console.log('all updated')
        });
}

 module.exports=mongoUtil;
