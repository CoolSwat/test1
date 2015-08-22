var mongoutil=require("./mongoUtil");
var cawlConfig=require('./scripts/pepperfry.json')
var objsiteMapImpl=require('./sitemapImpl')
var q=require('q')
var crawler = function(modelName){
	var crawlobj=this;
	crawlobj.batchSize=100;
	crawlobj.objmongoUtil=new mongoutil('localhost','sos',modelName,cawlConfig.mongoose_schema);
}
var async = require('async')
crawler.prototype.getLinks=function(){
	var crawlobj=this;
	var deferred=q.defer();
	crawlobj.objmongoUtil.documentCount().then(function(count){
	var promiseArr=[];
	console.log(count)
	var pages = Array.apply(null, {length: count/100}).map(Number.call, Number)
	console.log(pages)
	
	async.eachSeries(pages,function(pageno,callback){
		console.log('loop count ++++++++++++++++++++++++++++++' + pageno)
			crawlobj.objmongoUtil.findAll(pageno+1,100).then(function(res){
			var linkArr=[];
			var idArr=[]
			res.forEach(function(obj){
				linkArr.push(obj.loc);
				idArr.push(obj.id)
			})
				crawlobj.objmongoUtil.updateProcessingStatus(idArr)
					crawlobj.start(linkArr).then(function(){
				
					callback()
				})
				
			})
	},
	function(err){
        if(err)
            console.log(err)
            else
		console.log('doen')
	}
	)
	
	/*	for(var i=0;i<= count/100;i++){
		console.log('loop count ++++++++++++++++++++++++++++++' + i)
			crawlobj.objmongoUtil.findAll(i,100).then(function(res){
			console.log(res.loc)
				objcrawler.start(res)
			})
		}
		console.log("promice co"+promiseArr.length)
		q.all(promiseArr).then(function (results) {	
			var linkArr=[];
			results.forEach(function(res){
				res.forEach(function(link){
				linkArr.push(link)
				})
				deferred.resolve(linkArr)
			})
			console.log('q all'+linkArr.length)
		}).fail(function(){
		console.log('fail')
		})
		console.log('done') */
	}
)
return deferred.promise;
}
crawler.prototype.start=function(linkArr){
	var deffered=q.defer();
	var crawlobj=this;
	var query=cawlConfig.crawlerMap
	objsiteMapImpl.startCrawling(linkArr,query,'abc').then(function(dataArr){
     
	crawlobj.objmongoUtil.insertData(dataArr);
	deffered.resolve()
		console.log('done')
    })
	return deffered.promise;
}
crawler.prototype.test=function(){
var crawlobj=this;
//crawlobj.objmongoUtil.updateProcessingStatus(["55571e967cd35d0d23230ef5"]).then(function(){
 //   console.log('done')
//});
    crawlobj.objmongoUtil.updateStatusOfAll(0)
}

var objcrawler = new crawler('pepperfry')
objcrawler.getLinks();
//objcrawler.test()
//crawler.startCrawling(linksArr,query).then(function(){
  
 //   });