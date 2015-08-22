var Q         = require('q');
var mysql      = require('mysql');
var connection;
function _initDB(){
  var deferred = Q.defer();
 connection= mysql.createConnection('mysql://sosu:1q2w3e$R@win-plesk10-110.microhosting.in/searchos_sos?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    deferred.reject(new Error(err.stack));
  }

  console.log('connected as id ' + connection.threadId);
  deferred.resolve(connection.threadId)
});
return deferred.promise
}

function _insertData(products,insertQuery){
var deferred = Q.defer();
var sql='INSERT INTO products2 (url,category,price,name,image,m_logo,description,brand) VALUES ?';
var dataToInsert=_insertBulkJson(products);
var query = connection.query(sql, [dataToInsert], function(err, result) {
  if(err){
   console.log(err)
   deferred.resolve(new Error(err))
  }
  else
  {
   console.log("inserted"+result.affectedRows)
   deferred.resolve(result.affectedRows)
  }
});
return deferred.promise;
}


//INSERT INTO products_new (url,category,price,title,image)
function _insertBulkJson(products){
  
  var ps=[];
  
  // console.log(products);
  for(var i=0;i<products.length;i++)
  {
    var ls=[];
    
    var product=products[i];
    
    ls.push(product.url);
    ls.push(product.category);
    ls.push(product.price);
    ls.push(product.title);
    ls.push(product.image);
     ls.push(product.logo);
    ls.push(product.details);
    ls.push(product.brandName);
    
    ps.push(ls);
    
  }
  
  return ps;
// console.log("in insert bulk data"+ps);
  
}

function _terminateConnection(){
connection.end();
}
var dbUtil= function(){
  
  return {
    initDB:_initDB,
    insertData:_insertData,
     insertBulkJson:_insertBulkJson,
    terminateConnection:_terminateConnection
    
  }
  
}
//test cases
/* 
console.log(process.env.PORT)
var db= dbUtil();
db.initDB()
db.insertData([['test',236,'4444','test title','test image'],['test','236','4444','test title','test image'],['test','236','4444','test title','test image']]);
*/

module.exports = dbUtil;