//????????????????????????????????????????????????????????????????????????????????????
//??? Sätter Kommunnummer till datan från Menigo ?????????????????????????????????????
//????????????????????????????????????????????????????????????????????????????????????

var MongoClient = require('mongodb').MongoClient;
var kommunNummerObj = require('./kommundata.js')

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  var db = client.db('mathubben');
  if (err) throw err;
  // console.log(kommunNummerObj)
  db.collection('combinedDBs').find({}).forEach(function (data) {
    if (err) throw err;
      
    db.collection("combinedDBs").update({'_id': data['_id']}, {$set: {KommunNummer: kommunNummerObj[data['Kommun']]}}, function (err, rec) {
      if (err) console.log(err)
      console.log('Uppdaterat: ' + data['Kommun'] + ' ' + +kommunNummerObj[data['Kommun']] + ' - ' + rec.result.nModified)
    })
  })
})