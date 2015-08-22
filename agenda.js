var Agenda = require('agenda')
var agenda = new Agenda({db: { address: 'localhost:27017/agenda-example'}});

agenda.define('test job', function(job, done) {
console.log('job running');
done()
});

agenda.every('1 minute', 'test job');

// Alternatively, you could also do:

//agenda.every('*/3 * * * *', 'delete old users');

agenda.start();