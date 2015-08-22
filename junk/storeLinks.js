var Datastore = require('nedb')
  , db = new Datastore({ filename: 'datafile' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
}); 

var fs=require("fs");
var xml2object = require('xml2object');
var Q  = require('q');

var files=fs.readdirSync('./out');


var getLinks=function(filename){
     if(!filename)
    return false;
    extractLinks(filename).then(function(links){
        console.log(links.length);
        db.insert(links,function(err){
            console.log(err)
        })
        getLinks(files.shift())
    })
    
}
var parse=function(file){
    
}
var extractLinks=function(filename){
    var deferred=Q.defer()
    var source = fs.createReadStream('./out/'+filename);

// Create a new xml parser with an array of xml elements to look for
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

getLinks(files.shift());