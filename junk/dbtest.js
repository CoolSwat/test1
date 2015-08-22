var Datastore = require('nedb')
  , db = new Datastore({ filename: 'datafile' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  console.log(err)
}); 

db.count({},function(err,count){console.log(count)})