var noodle = require('./lib/noodle');
var Q           = require('q');
var prepareNoodle = require('./prepareNoodle');
//var dbUtil=require("./dbutil");
//var db=  new dbUtil();
var reciepe=new prepareNoodle();
var queryArr=require('./scripts/jabong').queryArr;
var categoryLinks=require("./categoryLinks");


function processIt(q){

 if(q)
 var noodleQuery=reciepe.handlePagination(q);
 noodleQuery.then(function(result){
     console.log(result);
     processQuery(result.shift(),result);
 })
 
//  processQuery(q);
  
  
}
function processQuery(query,result){
noodle.query(query)
.then(function (results) {
  console.log(JSON.stringify(results.results));
  var data=processResultsBeforeInsert(results)
  db.insertData(data).then(function(rows){
   // processIt(queryArr.shift())
   console.log(rows);
   processQuery(result.shift());
     console.log('done')
  })
  
});
}

 var processResultsBeforeInsert= function(results){
   var insertableArr=[];
   results.results[0].results.product.forEach(function(ele){
     insertableArr.push(ele);
   });
  return insertableArr;
 }

/* db.initDB().then(function(){
   processIt(queryArr.shift());
 }); */
 
 var categoryQuery=
  {
  url: 'http://www.shopclues.com/categories',
  type:"pc",
  map:{
    category:{
  selector: '.cat_icon_text_nl',
  looper:'.cat_icon_text_nl',
  extractor:[{
    categoryName:{
      selector:'.nav_topsubmenu_label_new a',
      properties:['text','href']
    },
    children:[{
     subCategoryName:{
      selector:'div div a',
      properties:['text','href']
    }
    }
     ]
  }
  ],
  extract:  'text'
    }
  }
  }
  
   var categoryQueryFlipkart=
  {
  url: 'http://www.flipkart.com/',
  type:"pc",
  map:{
    category:{
  selector: '.menu-column',
  looper:'.menu-column',
  extractor:[{
    categoryName:{
      selector:'.heading a',
      properties:['text','href']
    },
    children:[{
     subCategoryName:{
      selector:'.menu-item a',
      properties:['text','href']
    }
    }
     ]
  }
  ],
  extract:  'text'
    }
  }
  }
  
    var categoryQueryJewelsuok=
  {
  url: 'http://www.jewelsouk.com/',
  type:"pc",
  map:{
    category:{
  selector: '.dropdown-menu a[rel="childm"]',
  looper:'.dropdown-menu a[rel="childm"]',
  extractor:[{
    categoryName:{
      selector:'a[rel="childm"]',
      properties:['text','href']
    }
  }
  ],
  extract:  'text'
    }
  }
  }
  
  categoryLinks.extractCategoryLinks(categoryQueryJewelsuok).then(function(results){
   console.log(JSON.stringify(results));
  })