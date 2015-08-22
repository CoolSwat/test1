var _   = require('underscore');
var Q           = require('q');
var handlePagination=function(query){
    var deferred = Q.defer();
    var pagination=query.pagination;
    var noodleQueryArr=[];
    
    if(pagination.firstPageDifferent){
        noodleQueryArr.push(pagination.firstPageDifferent)
    }
    
   if(typeof pagination.customPageFunc=='function'){
       pagination.customPageFunc(query).then(function(updatedquery){
           if(updatedquery.processUpdatedQuery){
               processUpdatedQuery(updatedquery,noodleQueryArr)
           }
          deferred.resolve(noodleQueryArr)
       });
   }
    else if(pagination.startpage && pagination.totalProducts && pagination.pageInterval){
       
      
       var pageIteration=pagination.totalProducts/pagination.pageInterval;
       for(var i=0;i<=pageIteration;i++){
          var baseQuery =_.extend(query); 
           var url= pagination.paginationUrl;
           var recordId=pagination.startpage+i*pagination.pageInterval;
           url=url.replace('{{pageNO}}',recordId)
           console.log(url);
           baseQuery.url=url
           
           delete baseQuery.pagination;
           noodleQueryArr.push(baseQuery)
       }
        deferred.resolve(noodleQueryArr);
    }
    return deferred.promise;
};
var processUpdatedQuery=function(query,noodleQueryArr){
    var pagination=query.pagination;
    var pageIteration=pagination.totalProducts/pagination.pageInterval;
    for(var i=pagination.startpage;i<=pageIteration;i++){
          var baseQuery =_.extend({},query); 
           var url= pagination.paginationUrl;
           url=url.replace('{{pageNO}}',i)
           baseQuery.url=url
           if(pagination.nextPageHeader){
               query.requestHeader=pagination.nextPageHeader
           }
           delete baseQuery.pagination;
           noodleQueryArr.push(baseQuery)
       }
    
};
var prepareNoodle=function(){
    
    return {
      handlePagination : handlePagination 
        
    }
}

module.exports = prepareNoodle;