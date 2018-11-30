MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
    var db = client.db('mathubben');
    if (err) throw err;
    db.collection("").find({}).forEach(function (data) {

        // db.collection("combinedDBs").update({'_id': data['_id']}, {$set: {'VarugruppMathubben': huvudgrupp}}, function (err, rec) {
        //     if (err) console.log(err)
        //     console.log('Uppdaterat: ' + huvudgrupp)
        // })
    })
})