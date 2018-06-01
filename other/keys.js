var 	MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    var db = client.db('dabas');
    db.collection('MSstatistik').find().limit(1).toArray(function(err, data){
        if (err) throw err;
        
        Object.keys(data[0]).forEach(element => {
            console.log('"' + element + '", ')
        });
        
    })
})
