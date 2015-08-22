var mysql      = require('mysql');
var connection;
var sql;
function _initDB(dbConfig){
 connection=  mysql.createConnection({
  host     : dbConfig.DBServer,
  port     : '3306',
  user     : 's_user',
  password : '1q2w3e',
  database  : 'sos'
});

console.log("connectingssssssssssssss")
connection.connect(function(err) {
    if(err)
    console.log("Error: "+JSON.stringify(err))
    else
    console.log('connected');
});
sql='INSERT INTO '+dbConfig.productsTable+' (url,category,price,name,image,m_logo,description,brand) VALUES ?' //products6
}
// for bulk insert use following query
function _insertData(products){
var query = connection.query(sql, [products], function(err, result) {
  if(err)
   console.log(err );
  else
   console.log("inserted"+result.affectedRows)
});
}

//INSERT INTO products_new (url,category,price,title,image)
function _insertEsBulkJson(products){
  var ps=[];
  // console.log(products);
  if(products.length>0)
  {
  for(var i=0;i<products.length;i++)
  {
    var ls=[];
    
    var product=products[i];
    
    ls.push(product.url);
    ls.push(product.categoryId);
    ls.push(product.price);
    ls.push(product.title);
    ls.push(product.image);
    ls.push(product.logo);
    ls.push(product.details);
    ls.push(product.brandName);
    
    ps.push(ls);
    
  }
   this.insertData(ps);
  }
}

//url,category,price,name,image,m_logo,description,brand
function _insertBulkJson(products){
  
  var ps=[];
  
if(products.length > 0)
{
  for(var i=0;i<products.length;i++)
  {
    var ls=[];
    
    var product=products[i];
    if(product.price > 0)
    {
   //   console.log("product.price"+product.price);
    ls.push(product.url);
    ls.push(product.categoryId);
    ls.push(product.price);
    ls.push(product.title);
    ls.push(product.image);
    ls.push(product.logo);
    ls.push(product.details);
    ls.push(product.brandName);
    ps.push(ls);
    }
    
  }
   if(ps.length > 0)
  this.insertData(ps); 
  
  console.log("Data pusing -"+ps.length)
}

}// function end

function _terminateConnection(){
connection.end();
}
var _products=[];
var dbUtil= function(){
  return {
    initDB:_initDB,
    insertData:_insertData,
     insertBulkJson:_insertBulkJson,
    terminateConnection:_terminateConnection
  }
  
}

module.exports = dbUtil;

