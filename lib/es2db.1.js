var elasticsearch = require('elasticsearch'),
dbUtil=require("./dbUtils");
var SoCategories=require("./SosCategories"), fs=require("fs");
 var db=  new dbUtil();
  db.initDB();
 var SCategories=new SoCategories();
 SCategories.getCategoriesMap();
var client = new elasticsearch.Client({
//  host: 'http://localhost:9200',
host: 'http://52.74.116.189:9200/',
  log: [{
type: 'stdio',
levels: ['error', 'warning']
}]
});

var startpt=0;
var maxitems=1253800,totalMatchcount=0,inc=500;
var indexarr=[];

//for(var esi=0;esi<134081;esi+=100)

//for(var esi=0;esi<25;esi+=5)
function getpagedData(esi){
    
    
if(esi>=maxitems)
return totalMatchcount;
client.search({
  index: "fabfurnish",//metaObject.indexName,
  type: 'test',
  body: {
    query: {"match_all":{}},
"from" : esi,
"size" : inc 
    }
  
}).then(function (resp) {

    var hits = resp.hits.hits;
     var ps=[],mcid=0;
     if(esi==startpt)
        maxitems=resp.hits.total;
        
    for(var j=0; j<hits.length; j++) {
      
   // console.log(j);
      var item=hits[j]._source;
      var catid=null; var mcat=null;
      if(item!=null && item.category!=null)
      for (var i=item.category.length-1;i>=0;i--)
       {
         //  var strn=SCategories.getStemmedFrom.toLowerCase().trim());
           
         catid=SCategories.getCategoryID(item.category[i],item.category.toString());
         if(catid!=null)
         {
           mcat=item.category[i];
            break;
         }
         
       }
       var categoryID=999;
       if(catid!=null)
       {
           categoryID=catid.CatID;
           mcid++
            fs.appendFile('matchedCategories_pep.txt',item.category+": mapped to --> "+categoryID+"  URL--> ("+item.url+')\n', function (err) {
                      if (err) throw err;
              });
              
              
                var ls=[];
            item=getCleanedItem(item);
            if(item.title!=null && item.price >0)
            {
            ls.push(item.url);
            ls.push(categoryID);
            ls.push(item.price);
            ls.push(item.title);
            ls.push(item.image);// && item.image.length>0)?item.image[0]:item.image);
            ls.push("http://codenlogic.com/project/sos/wp-content/themes/sos/SiteLogos/fabfurnish_logo.png");
            ls.push(item.details);
            ls.push("fabfurnish");
            ps.push(ls);
            }
       }
    else
        fs.appendFile('unmatchedCategories_pep.txt',item.category+"  URL--> ("+item.url+')\n', function (err) {
                      if (err) throw err;
              });
      
    }// for each hit
    
    
   // if(ps.length>0)
    // db.insertData(ps);
     
      totalMatchcount+=mcid
      //console.log(ps[0]);
       console.log(esi +" matched->"+mcid +"total"+totalMatchcount);
   // else  
    getpagedData(esi+inc)
}, function (err) {
    console.trace(err.message);

});

}// for each 100 products

function getCleanedItem(item)
{
 
 // Cleaning for prie
 var price;
 if(item.price)
  price=item.price;
 else if(item.pricex)
  price=item.pricex;
  while(price.indexof(",")>0)
    price=price.replace(",","");
  while(price.indexof("Rs. ")>0)
    price=price.replace("Rs. ","");
 item.price=price;
 
 // Cleaning for Image
 if(Array.isArray(item.image))
  {
    item.image=item.image[0];
  }
 
 
  // Cleaning for Image
 if(Array.isArray(item.details))
  {
    item.details=item.details.toString();
  }
 
  // Cleaning for Category
   if(!Array.isArray(item.category))
  {
   var categorys=item.category;
   
   // added for preeerfry
   categorys=categorys.replace("You Are In:  ","");
   var sep="/"
   var carr=item.category.split(sep);
   item.category=carr;
  }
 
 return item;
 
}
getpagedData(startpt);

//}).then(getpagedData(esi+100),function (err) {
//    console.trace(err.message);