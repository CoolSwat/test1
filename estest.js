var elasticsearch = require('elasticsearch');
exports.client = new elasticsearch.Client({
  host: 'localhost:9200',
    minSockets:5,
  log: [{
  type: 'stdio',
  levels: ['error', 'warning']
}]
});


/*client.create({
  index: 'testindex',
  type: 'mytype',
  id: '1',
  body:[ {
    title: 'Test 3',
    tags: ['y', 'z'],
    published: true,
    published_at: '2013-01-01',
    counter: 1
  },{
    title: 'Test 2',
    tags: ['y', 'z'],
    published: true,
    published_at: '2013-01-01',
    counter: 1
  }]
}, function (error, response) {
  console.log(response)
}); */
