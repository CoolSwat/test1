var q       = require('q'),
    util    = require('util'),
    cheerio = require('cheerio'),
    noodle;

exports._init  = function (n) {
  noodle = n;
};

exports.fetch  = fetch;
exports.select = select;

function fetch (url, query) {
  var deferred = q.defer();

  if (noodle.cache.check(query)) {
    deferred.resolve(noodle.cache.get(query).value);
    return deferred.promise;
  } else {
    return noodle.fetch(url, query).then(function (page) {
      return select(page, query);
    });
  }
}

function select (body, query) {
  var deferred = q.defer(),
      extract  = query.extract || 'text',
      selector = query.selector,
      page     = cheerio.load(body),
      $         = cheerio.load(body),
      selected = page(selector),
      extractor= query.extractor,
      results  = [];

  if (!selector) {
    deferred.resolve(noodle._wrapResults(body.trim(), query));
    return deferred.promise;
  }
  else if (util.isArray(extractor)) {
    $(selector).each(function (i, elem) {
      var item = {},
          notEmpty,
          context= elem;
    
      extractor.forEach(function (itemToextract) {
         var props=Object.keys(itemToextract);
         props.forEach(function(prop) {
             item[prop] = extractProperty($,context, itemToextract[prop].selector, itemToextract[prop].property,itemToextract[prop].replacerfunc);
            notEmpty       = notEmpty || item[prop];
         })
        
      });

      if (notEmpty) {
        results.push(item);
      }
    });
  }
  else {
    selected.each(function (i, elem) {
      results.push(extractProperty(page, elem, extract));
    });
  }

  // Pass back the extracted results from the DOM

  if (results.length === 0) {
    deferred.reject(new Error('Could not match with that selector or extract value'));
  } else {
    deferred.resolve(noodle._wrapResults(results, query));
  }

  return deferred.promise;
}

function extractProperty ($,context, elementToExtract, property,replacerfunc) {
    var extracted;
  if (property === 'text') {
      extracted=$(context).find(elementToExtract).text();
      if(typeof replacerfunc=='function' ){
         extracted = replacerfunc(extracted);
      }
      else if(extracted){
          extracted=extracted.replace(/(\r\n|\n|\r)/gm, "").trim();
      }
    return extracted;
  }
  else if (property === 'html' || property === 'innerHTML') {
    return context(elementToExtract).html();
  }
  else {
      extracted=$(context).find(elementToExtract).attr(property);
      if(typeof replacerfunc=='function' ){
         extracted = replacerfunc(extracted);
      }
    return extracted;
  }
}