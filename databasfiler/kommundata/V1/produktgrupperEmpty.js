MongoClient = require('mongodb').MongoClient;
var huvudgrupp;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  var db = client.db('dabas');
  if (err) throw err;

  db.collection("combinedDBs").find(({'VarugruppMathubben': {$exists: true}})).forEach(function (data) {

    db.collection("combinedDBs").update({'_id': data['_id']}, {$set: {'VarugruppMathubben': null}}, function (err, rec) {
      if (err) console.log(err)
      console.log('Uppdaterat: ')
    })
  })
})