var 	MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    var db = client.db('dabas');
    if (err) throw err;
    mr = this.db.command({
        "mapreduce": "menigoRep4",
        "map": function () {
            for (var key in this) { emit(key, null); }
        },
        "reduce": function (key, stuff) { return null; },
        "out": "menigoRep4" + "_keys"
    })
    // Then run distinct on the resulting collection so as to find all the keys:
    
    db[mr.result].distinct("_id", function(err, data){
        console.log(data)
    })
    // db.collection("menigoRep4").distinct("KommunNummer", function (err, kommunData) {
    // ["foo", "bar", "baz", "_id", ...]
})
