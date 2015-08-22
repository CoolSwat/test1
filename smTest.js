    var fs=require('fs')
    var xmlParser=require('./parseXml')
    var xmls=fs.readdirSync('./tmp')
    var logger = require("./lib/w-logger");
    var linksArr=JSON.parse(fs.readFileSync('./out/2oq_2014-10-26_0.txt'))

    var EventEmitter = require("events").EventEmitter;


    var crawler=require('./sitemapImpl')
    var query= require('./scripts/Flipkart_SM_Q')

    process.on('uncaughtException',function(){
    process.exit(1)
    });
    
    /* var ee = new EventEmitter();
    ee.on("someEvent", function () {
        logger.info("First File processing completed")
        crawler.killInstance()
        processXml(xmls.shift())
    }); */

    var processXml=function(xmlName){
    logger.warn("Parsing xml==========="+xmlName)
    xmlParser.parser('./tmp/'+xmlName).then(function(result){
    logger.info("XML Parsed")
    crawler.checkExistingData(xmlName,result).then(function(data){
        if(!data.dataExists){
    crawler.createIndex(xmlName).then(function(){
    crawler.startCrawling(result,query,xmlName).then(function(){
    crawler.killInstance()
        processXml(xmls.shift())
    });
        logger.info("Crawling Started")
    })
            }
        else if(data.dataExists && data.doNotProcess){
        logger.warn('skipping')
        processXml(xmls.shift())
        }
        
        else {
            //tmp change
      /*  logger.warn('reduced')
        console.log(data.reducedArr.length)
        crawler.startCrawling(data.reducedArr,query,xmlName).then(function(){
        crawler.killInstance()
        processXml(xmls.shift())
    }); */
            logger.warn('skipping')
        processXml(xmls.shift())
        }
    });
        })
    }
    logger.info("First File processing")
    processXml(xmls.shift())




