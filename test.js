var mongoutil=require("./mongoUtil");
var util=require("./utility");

var objmongoutil = new mongoutil('localhost','sos','fabfurnish');
//objmongoutil.insertSiteMapUrls();
function updateDemo(){
objmongoutil.documentCount().then(function(count){
console.log(count)
for(var i=1;i<= count%100;i++){
objmongoutil.findAll(i,100,function(resArr){
var idArr=[]
resArr.forEach(function(res){
idArr.push({loc:"abc.com"})
})
objmongoutil.updateProcessingStatus(idArr)
})
}
})
}
updateDemo()

//util.getLinks('http://www.fabfurnish.com/sitemap/sitemap.xml')

/*
es.client.search({
"index":'1m7_2014-12-16_0.xml',
"body":{"query":{"match_all":{}},"size":1,"fields":["url"],"sort":[{"_timestamp":{"order":"desc"}}]}
},function(err, response, status){
console.log(response.hits.hits[0].fields.url[0])
}
)*/
