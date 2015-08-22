var elasticsearch = require('elasticsearch'),
dbUtil=require("./lib/dbUtils");
var SoCategories=require("./lib/SosCategories"),
cawlConfig=require('./scripts/pepperfry'),
fs=require("fs");
var db=  new dbUtil();
var SCategories=new SoCategories();
var dumpConfig,client;
var startpt=0;
var maxitems=123800,
totalMatchcount=0,
inc=500;
var indexarr=[],
mcid=0;
 
function dumpIntoDB(cawlConfig)
{
 dumpConfig=cawlConfig;
 SCategories.getCategoriesMap();
 db.initDB(dumpConfig);
 client = new elasticsearch.Client({
                     host: dumpConfig.ESServer,
                       log: [{
                             type: 'stdio',
                             levels: ['error', 'warning']
                             }]
                     });
inc=dumpConfig.EsDbBatchSize;
getpagedData(startpt);
}

function getpagedData(esi){
if(esi>=maxitems)
return totalMatchcount;
client.search({
  index: dumpConfig.indexName,//"pepperfry1"
  type: 'test',
  body: {
    query: {"match_all":{}},
            "from" : esi,
            "size" : inc 
           }
      }).then(function (resp) {

    var hits = resp.hits.hits;
     var ps=[];
     mcid=0;
     if(esi==startpt)
        maxitems=resp.hits.total;
        
    for(var j=0; j<hits.length; j++) {
             var item=hits[j]._source;
                item=getCleanedItem(item);
         if(item.categoryID!=null&&item.title!=null && item.price >0)
            {      
            var ls=[];
            ls.push(item.url);
            ls.push(item.categoryID);
            ls.push(item.price);
            ls.push(item.title);
            ls.push(item.image);// && item.image.length>0)?item.image[0]:item.image);
            ls.push("http://codenlogic.com/project/sos/wp-content/themes/sos/SiteLogos/"+dumpConfig.siteName+"_logo.png");
            ls.push(item.details);
            ls.push(dumpConfig.siteName);
            ps.push(ls);
             fs.appendFile('logs/matchedCategories_'+dumpConfig.siteName+'.txt',item.category+": mapped to --> "+item.categoryID+"  URL--> ("+item.url+')\n', function (err) {
                      if (err) throw err;
              });
            }
       else
        fs.appendFile('logs/unmatchedCategories_'+dumpConfig.siteName+'.txt',item.category+": mapped to --> "+item.categoryID+"  URL--> ("+item.url+')\n', function (err) {
                      if (err) throw err;
              });
    }// for each hit
    if(ps.length>0)
     db.insertData(ps);
      totalMatchcount+=mcid
       console.log(esi +" matched-> "+mcid +"  total  ->  "+totalMatchcount);
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
  if(price!=null)
  {
  // console.log(price);
  while(price.indexOf(",")>0)
    price=price.replace(",","");
  while(price.indexOf("Rs. ")>0)
    price=price.replace("Rs. ","");
 item.price=price;
  }
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
   if(item!=null && item.category!=null)
   {
   if(!Array.isArray(item.category))
     {
      var categorys=item.category;
      
      // added for preeerfry
      categorys=categorys.replace("You Are In:","");
      var sep="/";
      var carr=categorys.split(sep);
      item.category=carr;
     }
  
    var catid=null; var mcat=null;
      for (var i=item.category.length-1;i>=0;i--)
       {
         catid=SCategories.getCategoryID(item.category[i],item.category.toString());
         if(catid!=null)
         {
           mcat=item.category[i];
            break;
         }
       }// for loop end
    if(catid!=null)
       {
           item.categoryID=catid.CatID;
           mcid++
       }
   }
 
 return item;
 
}


dumpIntoDB(cawlConfig);