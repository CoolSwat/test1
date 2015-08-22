var crawler = require('./crawler');
var Q=require('q')
var _ =require('underscore')
var query={
    "url": "http://www.flipkart.com/zeeshaan-contemporary-printed-analog-wall-clock/p/itmeyyresnkhgwf7",
    "type": "html",
    "map": {
        "title": {
            "selector": ".section.omniture-field .title",
            "extract": "text"
        },
        "price": {
            "selector": ".top-section .selling-price",
            "extract": "text"
        },
        "image":{
          "selector":".productImage",
          "extract":"data-src"
        },
        "category":{
          "selector":"#fk-mainbody-id ul a.link",
          "extract":"text"
          
        },
        "details":{
          "selector":".description-text",
          "extract":"text"
        }
    }
}
var linkArr=[{"url":"http://www.flipkart.com/zeeshaan-contemporary-printed-analog-wall-clock/p/itmeyyresnkhgwf7"},{"url":"http://www.flipkart.com/seven-secrets-stainless-steel-3-cup-tealight-holder/p/itmeymfdpwmfybjf"},{"url":"http://www.flipkart.com/shaildha-s-water-colour-print-painting-fine-art/p/itmdzkexbfywtzvh"},{"url":"http://www.flipkart.com/destudio-blooming-birds-wall-stickers-size-mega-sticker/p/itmeyz63fyt3afyh"},{"url":"http://www.flipkart.com/destudio-kindess-wall-stickers-size-medium-sticker/p/itmeyz5vweegy76h"},{"url":"http://www.flipkart.com/destudio-turtle-couple-one-wall-stickers-size-medium-sticker/p/itmeyz5yzgexgwjh"},{"url":"http://www.flipkart.com/destudio-saxophone-player-one-wall-stickers-size-jumbo-sticker/p/itmeyz6f3hg3gh7j"},{"url":"http://www.flipkart.com/your-life-framed/p/itmdtqb4hgvjgzbz"},{"url":"http://www.flipkart.com/cycle-woody-incense-sticks/p/itmdzhy4bjzkzway"},{"url":"http://www.flipkart.com/brahmz-aroma-oil-burner-elephant-rose-candle-diffuser-air-freshener/p/itmeymyahsgjbhsg"},{"url":"http://www.flipkart.com/seven-rays-yin-yang-red-paper-print/p/itmdzugfxzgyf7gh"},{"url":"http://www.flipkart.com/heiress-landscape-1949-paper-print/p/itmdhcubemhbhnug"},{"url":"http://www.flipkart.com/parrot-03-canvas-art/p/itmdxy9cudfcs9db"},{"url":"http://www.flipkart.com/colored-composition-hommage-sebastin-johann-bach-fine-art-print/p/itmdvhqzjjknvnmd"},{"url":"http://www.flipkart.com/croquet-party-manet-canvas-art/p/itmdzwewejfnswnj"},{"url":"http://www.flipkart.com/hamlet-magenta-1948-paper-print/p/itmdhcubdr9j6qjm"},{"url":"http://www.flipkart.com/destudio-lets-dance-one-wall-stickers-size-super-sticker/p/itmeyz5zbymydfmw"},{"url":"http://www.flipkart.com/indigo-creatives-lord-ganesha-decorative-wall-mirror/p/itmey7yqrhb6wrr4"},{"url":"http://www.flipkart.com/destudio-big-ears-elephant-kids-nursery-wall-stickers-size-medium-sticker/p/itmeyz5vu42jcnmd"},{"url":"http://www.flipkart.com/seven-secrets-apple-candle/p/itmeytscmgxejzxs"},{"url":"http://www.flipkart.com/destudio-alien-monster-wall-stickers-size-mega-sticker/p/itmeyz63zksh5fsp"},{"url":"http://www.flipkart.com/spider-man-poster/p/itmdwhjyk3sphhcp"},{"url":"http://www.flipkart.com/lps022373-18-x-12-inches-paper-print/p/itmey8ugebpsxnqt"},{"url":"http://www.flipkart.com/gunga-jumuna-hindi-movie-poster-luster-paper/p/itmdvvzfmbdckyyf"},{"url":"http://www.flipkart.com/purpledip-photo-frame-mughal-era/p/itmdxwdpxutkuvz8"},{"url":"http://www.flipkart.com/beach-trouville-canvas-art/p/itmdfyu46jngtvfj"},{"url":"http://www.flipkart.com/sevan-secrets-rustic-diyas-candle/p/itmeyn4vxcfbwcs5"},{"url":"http://www.flipkart.com/panache-oval-digits-analog-wall-clock/p/itmey4jy4pafxrve"},{"url":"http://www.flipkart.com/time-quote-paper-print/p/itmdyysjfcss3e6k"},{"url":"http://www.flipkart.com/colossal-nyc-fine-art-print/p/itmdrcfyrgkugxax"},{"url":"http://www.flipkart.com/namo-padma-steel-1-cup-tealight-holder/p/itmdxpxjzsqsqsvt"},{"url":"http://www.flipkart.com/destudio-may-your-bobbin-one-wall-stickers-size-medium-sticker/p/itmeyz5xfgsybbrg"},{"url":"http://www.flipkart.com/58-buick-century-holland-fine-art-print/p/itmdgwgu98pu2ktg"},{"url":"http://www.flipkart.com/gifts-meeta-white-lotus-candle-diwali/p/itmeyhh4nhsfnyb5"},{"url":"http://www.flipkart.com/vineyard-hill-fine-art-print/p/itmdegfjgjcef5m5"},{"url":"http://www.flipkart.com/destudio-he-loves-wall-stickers-size-jumbo-sticker/p/itmeyz6ykpkjmxkc"},{"url":"http://www.flipkart.com/luis-suarez-soccer-poster/p/itmdwhjyjxgxtzgn"},{"url":"http://www.flipkart.com/sommelier-fine-art-print/p/itmday42ngnxsj8b"},{"url":"http://www.flipkart.com/cristo-benedicente-raffaello-code-rh3401-canvas/p/itmdv5hhgckvahua"},{"url":"http://www.flipkart.com/fourwalls-bonsai-assorted-artificial-plant/p/itmdyfy43jjxaznj"},{"url":"http://www.flipkart.com/august-evening-fine-art-print/p/itmdegfnshz2bmzt"}]

var linksArr=JSON.parse(fs.readFileSync('./links.txt'))
console.log(linksArr.length)
var splitArr=function(batchSize,linkArr){
var n = batchSize;
var lists = _.groupBy(linkArr, function(element, index){
  return Math.floor(index/n);
});
lists = _.toArray(lists);
    return lists;
}
var splittedArr=splitArr(100,linksArr)
console.log(splittedArr[0].length)
var iteration=0
function processLinks(arr){
    console.log(arr.length)
    
var promiseArr=[]
arr.forEach(function(link){
 //   console.log(link)
promiseArr.push(crawler.getQuery(link.url,query))
})
Q.all(promiseArr).then(function(){
console.log('done==========='+iteration++ )
processLinks(splittedArr.shift())
},console.error)
}

processLinks(splittedArr.shift())
//crawler.getQuery('http://www.flipkart.com/zeeshaan-contemporary-printed-analog-wall-clock/p/itmeyyresnkhgwf7',query).then(function(data){
//console.log(data)
//})