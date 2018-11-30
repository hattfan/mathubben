var MongoClient = require('mongodb').MongoClient;

console.log(`"{"artiklar":["`)

// console.time("dbsave");
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) throw err;
  var db = client.db('mathubben');

  db.collection("combinedDBs").aggregate([{
    "$group": {
      "_id": {
        name: "$Benämning",
        code: "$LevArtNrMathubben"
      }
    }
  }]).toArray(function (req, res) {
    res.forEach(row => {
      row['_id'].name !== undefined || row['_id'].name ? row['_id'].name = row['_id'].name.replace(/"/g, "") : null
      console.log(`{"Benämning":"${row['_id'].name}","LevArtNrMathubben":"${row['_id'].code}"},`);
    })
    // console.timeEnd("dbsave");
  });
})