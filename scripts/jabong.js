var Q           = require('q');
var noodle = require('../lib/noodle');

exports.queryArr=[{
  url:      'http://www.jabong.com/men/clothing/casual-shirts/',
  type:"bot",
  requestHeader:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36',
'X-NewRelic-ID':'Ug4PUVRADAsCVFFU',
'X-Requested-With':'XMLHttpRequest'
},
  map:{
    product:{
  selector: 'li',
  looper:'li',
  extractor:[{
    price:{
      selector:'.qa-price',
      property:'text',
      replacerfunc:function(item){
        console.log('hurry i am being washed up');
        return item;
      }
    },
    brandName:{
      selector:'.qa-brandName',
      property:'text'
    }
  }],
  extract:  'text'
    }
  },
  pagination:{
    paginationUrl:'http://www.jabong.com/men/clothing/casual-shirts/?page={{pageNO}}',
    totalPages:100,
    startpage:2,
    pageInterval:52,
    totalProducts:100,
    nextselector:'',
    lastSelector:'',
    customPageFunc:function(query){
     var deferred = Q.defer();
     var totalProducts;
      var lastPageExtractor={
            "url": "http://www.jabong.com/men/clothing/casual-shirts/",
            "requestHeader":{'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36',
            'X-NewRelic-ID':'Ug4PUVRADAsCVFFU',
            'X-Requested-With':'XMLHttpRequest'
            },
            "type": "html",
            "map": {
                "lastPage": {
                    "selector": ".ProductCounter",
                    "extract": "text"
                }
            }
        }
        noodle.query(lastPageExtractor).then(function (results) {
          console.log(JSON.stringify(results));
          totalProducts=results.results[0].results.lastPage[0];
          totalProducts=totalProducts.replace('Products','').trim();
          
        }).then(function(){
             query.pagination.totalProducts=totalProducts;
             query.processUpdatedQuery=true;
             deferred.resolve(query)
        });
        return deferred.promise;
    },
    lastPageDetection:function(){
      
    },
    firstPageDifferent:{
      url:'http://www.jabong.com/men/clothing/casual-shirts/',
      requestHeader:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36',
            'X-NewRelic-ID':'Ug4PUVRADAsCVFFU',
            'X-Requested-With':'XMLHttpRequest'
            },
      type:'bot',
       map:{
    product:{
  selector: '#productsCatalog li',
  looper:'#productsCatalog li',
  extractor:[{
    price:{
      selector:'.qa-price',
      property:'text',
      replacerfunc:function(item){
        console.log('hurry i am being washed up');
        return item;
      }
    },
    brandName:{
      selector:'.qa-brandName',
      property:'text'
    }
  }],
  extract:  'text'
    }
  }
      
    },
    nextPageHeader:{
      'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36',
            'X-NewRelic-ID':'Ug4PUVRADAsCVFFU',
            'X-Requested-With':'XMLHttpRequest',
            'Referer':'http://www.jabong.com/men/clothing/casual-shirts/'
            
    },
    paginationWithPost:{
      
    }
  }
}]