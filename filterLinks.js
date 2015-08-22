var fs=require('fs')

var linksArr=JSON.parse(fs.readFileSync('./out/jewelsouk_links.txt'))
var filterArr=[];
linksArr.forEach(function(url){
if(url.indexOf('controller') >-1)
filterArr.push(url)
})

fs.writeFile('./out/jewelsouk_links_filtered.txt',JSON.stringify(filterArr))