var noodle = require('./lib/noodle');
var Q   = require('q');

exports.extractCategoryLinks=function(query){
    var deffered=Q.defer();
    noodle.query(query).then(function(results){
        deffered.resolve(results)
    });
    
    return deffered.promise;
}

var categoryLinkMapping=function(){
    
}

var storeCategoryLinks=function(){
    
}