/*var parseString = require('xml2js').parseString;
var xml = '<?xml version="1.0" encoding="utf-8"?> <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>http://www.flipkart.com/sitemap/ajy_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/t06_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/r18_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/dgv_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/1m7_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/1m7_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4rr_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/6bo_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/6bo_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/6bo_2014-10-26_2.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/6bo_2014-10-26_3.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/2oq_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/2oq_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/2oq_2014-10-26_2.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/2oq_2014-10-26_3.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/jek_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/mcr_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/mcr_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/mcr_2014-10-26_2.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/26x_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/j9e_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/vdm_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/vdm_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/dep_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/mgl_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_2.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_3.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_4.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_5.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_6.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_7.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/tyy_2014-10-26_8.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/ckf_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/kyh_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/amz_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/reh_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/reh_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_1.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_2.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_3.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_4.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_5.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_6.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_7.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_8.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_9.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_10.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_11.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_12.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_13.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_14.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_15.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_16.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_17.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_18.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_19.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_20.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_21.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_22.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_23.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_24.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/4kt_2014-10-26_25.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/osp_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/qrm_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/xfw_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap><sitemap><loc>http://www.flipkart.com/sitemap/r4l_2014-10-26_0.xml.gz</loc><lastmod>2014-10-27</lastmod></sitemap></sitemapindex>'
parseString(xml, function (err, result) {
    console.dir(result.sitemapindex.sitemap);
}); */


var arr=[ 'http://www.flipkart.com/sitemap/ajy_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/t06_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/r18_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/dgv_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/1m7_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/1m7_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/4rr_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/6bo_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/6bo_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/6bo_2014-10-26_2.xml.gz',
  'http://www.flipkart.com/sitemap/6bo_2014-10-26_3.xml.gz',
  'http://www.flipkart.com/sitemap/2oq_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/2oq_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/2oq_2014-10-26_2.xml.gz',
  'http://www.flipkart.com/sitemap/2oq_2014-10-26_3.xml.gz',
  'http://www.flipkart.com/sitemap/jek_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/mcr_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/mcr_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/mcr_2014-10-26_2.xml.gz',
  'http://www.flipkart.com/sitemap/26x_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/j9e_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/vdm_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/vdm_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/dep_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/mgl_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_2.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_3.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_4.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_5.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_6.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_7.xml.gz',
  'http://www.flipkart.com/sitemap/tyy_2014-10-26_8.xml.gz',
  'http://www.flipkart.com/sitemap/ckf_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/kyh_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/amz_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/reh_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/reh_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_1.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_2.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_3.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_4.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_5.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_6.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_7.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_8.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_9.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_10.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_11.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_12.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_13.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_14.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_15.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_16.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_17.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_18.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_19.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_20.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_21.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_22.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_23.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_24.xml.gz',
  'http://www.flipkart.com/sitemap/4kt_2014-10-26_25.xml.gz',
  'http://www.flipkart.com/sitemap/osp_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/qrm_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/xfw_2014-10-26_0.xml.gz',
  'http://www.flipkart.com/sitemap/r4l_2014-10-26_0.xml.gz']

  
  
var request = require('request'),
    zlib = require('zlib'),
    fs = require('fs');
    
var qdomain = require("qdomain");
// Fetch http://example.com/foo.gz, gunzip it and store the results in 'out'
var extractLinks=function(gzlink){
    if(gzlink){
   var  out = fs.createWriteStream('./out/'+gzlink.replace('http://www.flipkart.com/sitemap/','').replace('.gz',''));
qdomain(function(defer){
 request(gzlink).pipe(zlib.createGunzip()).pipe(out).on("close", defer.resolve);
}).then(function(){
    console.log('done')
    extractLinks(arr.shift());
}).fail(function(err){
  // Any IO errors or transform errors will be handled here
  console.log(err)
   extractLinks(arr.shift());
});
}
}
extractLinks(arr.shift());