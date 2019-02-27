var schedule = require('node-schedule'),
MongoClient = require('mongodb').MongoClient;


// /*----------  Schedueler  ----------*/
var j = schedule.scheduleJob('01 * * * * *', function () {
  MongoClient.connect('mongodb://normal_user:normal1@ds235732.mlab.com:35732/mathubben', (err, client) => {
    if (err) console.log('Mongoclient-error');
    keepDatabaseOnline(client);
  })
});

function keepDatabaseOnline(client) {
  var db = client.db('mathubben');
  db.collection('dataPerKommun').find({ 'LevArtNr': 'MENIGO FOG - MENY545' }).toArray(function (err, result) {
    if (err) throw err
    console.log('Ah ah ah ah staying alive, staying alive - ' + new Date());
  })
}
