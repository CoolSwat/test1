var request=require('request')
var fs=require('fs')
var q=require('q')
var xml2object = require('xml2object');

var parser = new xml2object([ 'loc' ]);
var linkArr=[]
function getLinks(sitemapURL){
    console.log(sitemapURL);
request({url:sitemapURL, headers:{'User-Agent':'request'}}).pipe(parser.saxStream)
}




// Bind to the object event to work with the objects found in the XML file
parser.on('object', function(name, obj) {
  //  console.log('Found an object: %s', name);
   // console.log(obj['$t']);
    var link=obj['$t'];
      linkArr.push(link)
   // console.log(obj);
});

// Bind to the file end event to tell when the file is done being streamed
parser.on('end', function() {
    console.log('Finished parsing xml!'+linkArr.length);
  //  console.log(linkArr.length)
     l++;
    if(l<links.length)
      getLinks(links[l])
    else
    fs.writeFile('./out/fabfurnish_links1.txt',JSON.stringify(linkArr));
   // linkArr=[];
});


String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var links=["http://www.fabfurnish.com/sitemap/furniture-products.xml","http://www.fabfurnish.com/sitemap/solid-wood-products.xml","http://www.fabfurnish.com/sitemap/solid-wood-sitemap.xml","http://www.fabfurnish.com/sitemap/bed-bath-products.xml","http://www.fabfurnish.com/sitemap/bed-bath-sitemap.xml","http://www.fabfurnish.com/sitemap/home-decor-products.xml","http://www.fabfurnish.com/sitemap/home-decor-sitemap.xml","http://www.fabfurnish.com/sitemap/kitchen-dining-products.xml","http://www.fabfurnish.com/sitemap/kitchen-dining-sitemap.xml","http://www.fabfurnish.com/sitemap/lighting-products.xml","http://www.fabfurnish.com/sitemap/lighting-sitemap.xml","http://www.fabfurnish.com/sitemap/luggage-bags-products.xml","http://www.fabfurnish.com/sitemap/luggage-bags-sitemap.xml","http://www.fabfurnish.com/sitemap/kids-baby-products.xml","http://www.fabfurnish.com/sitemap/kids-baby-sitemap.xml","http://www.fabfurnish.com/sitemap/home-improvement-products.xml","http://www.fabfurnish.com/sitemap/home-improvement-sitemap.xml","http://www.fabfurnish.com/sitemap/housekeeping-products.xml","http://www.fabfurnish.com/sitemap/housekeeping-sitemap.xml","http://www.fabfurnish.com/sitemap/games-products.xml","http://www.fabfurnish.com/sitemap/games-sitemap.xml","http://www.fabfurnish.com/sitemap/eco-friendly-products.xml","http://www.fabfurnish.com/sitemap/eco-friendly-sitemap.xml","http://www.fabfurnish.com/sitemap/gifts-products.xml","http://www.fabfurnish.com/sitemap/gifts-sitemap.xml","http://www.fabfurnish.com/sitemap/sale-products.xml","http://www.fabfurnish.com/sitemap/sale-sitemap.xml"]//,"http://www.fabfurnish.com/sitemap/invisible-products.xml","http://www.fabfurnish.com/sitemap/invisible-sitemap.xml","http://www.fabfurnish.com/sitemap/invisible-products-1.xml"];
//["http://www.pepperfry.com/furniture.xml","http://www.pepperfry.com/home_decor.xml","http://www.pepperfry.com/appliances.xml","http://www.pepperfry.com/furnishings.xml","http://www.pepperfry.com/housekeeping.xml","http://www.pepperfry.com/kitchen_and_dining.xml","http://www.pepperfry.com/pets_supplies.xml","http://www.pepperfry.com/lamps_and_lighting.xml","http://www.pepperfry.com/bath.xml"];
var l=0;
getLinks(links[l])