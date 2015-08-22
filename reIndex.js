var exec = require('child_process').exec,
    child;
var es=require("./estest");
var q=require('q')
function reIndex(indexname){
    var deferred=q.defer()
if(indexname == "logs" || indexname == "main-data-index")
    deferred.resolve();
else{
child = exec('elasticsearch-reindex -f http://localhost:9200/'+indexname+'/test -t  http://localhost:9200/main-data-index/test',
  function (error, stdout, stderr) {
   // console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    deferred.resolve();
    if (error !== null) {
      console.log('exec error: ' + error);
    }
}); 
}
return deferred.promise;
}

es.client.indices.getAlias(function(error,response){
var indexArr= Object.keys(response)
reIndex(indexArr.shift()).then(function(){
reIndex(indexArr.shift())
})

})