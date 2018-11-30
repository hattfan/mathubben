MongoClient = require('mongodb').MongoClient;
var konsultVal = ["Menigo", "M&S", "Hantera", "DKAB", "Compere"]
var huvudgrupp;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  var db = client.db('mathubben');
  if (err) throw err;
  db.collection("translation").find().toArray(function (err, varugrupp) {
    if (err) throw err
    // console.log(varugrupp)
    var count = 0;

    // db.collection("combinedDBs").find(({ 'VarugruppMathubben': { $exists: false } })).forEach(function (data) {
    db.collection("combinedDBs").find({}).forEach(function (data) {
      count = count + 1

      huvudgrupp = '';
      for (let i = 0; i < varugrupp.length; i++) {
        Object.keys(varugrupp[i]).forEach(function (key) {
          // console.log(data.Varugrupp)
          if (data.Varugrupp === ''){
            // console.log('här')
            huvudgrupp = '';
          }
          else if (data.Varugrupp !== null) {
            // console.log('elseif')
            if (varugrupp[i][key].toString().replace(/ /g, '') == data.Varugrupp.toString().replace(/ /g, '')) {
              huvudgrupp = varugrupp[i]['Vårtfacit']
            }
          }
        });
      }
      console.log(huvudgrupp + ' i loop')
      db.collection("combinedDBs").update({ '_id': data['_id'] }, { $set: { 'VarugruppMathubben': huvudgrupp } }, function (err, rec) {
        if (err) console.log(err)
        console.log('Uppdaterat: ' + huvudgrupp)
      })
    })
  })
})













// MongoClient = require('mongodb').MongoClient;
// var rp = require('request-promise');
// var konsultVal = ["Menigo", "M&S", "Hantera", "DKAB", "Compere"]
// var huvudgrupp;

// MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

//   var db = client.db('mathubben');
//   if (err) throw err;
//   db.collection("translation").find().toArray(function (err, varugrupp) {
//     if (err) throw err
//     // console.log(varugrupp)
//     var count = 0;

//     // db.collection("combinedDBs").find(({ 'VarugruppMathubben': { $exists: false } })).forEach(function (data) {
//     db.collection("combinedDBs").find(({'VarugruppMathubben': {$exists: false}})).toArray(function (err, data) {
 
//       (function loop(i) {
//         const promise = new Promise((resolve, reject) => {}).then(() => i >= gtin.length || loop(i + 1));
//         huvudgrupp = '';
//         for (let i = 0; i < varugrupp.length; i++) {
//           Object.keys(varugrupp[i]).forEach(function (key) {
//             if (data[i].Varugrupp != null) {
//               if (varugrupp[i][key].toString().replace(/ /g, '') == data[i].Varugrupp.toString().replace(/ /g, '')) {
//                 huvudgrupp = varugrupp[i]['Vårtfacit']
//               }
//             }
//           });
//         }
//         console.log(huvudgrupp)
//         resolve()
//         // db.collection("combinedDBs").update({'_id': data[i]['_id']}, {$set: {'VarugruppMathubben': huvudgrupp}}, function (err, rec) {
//         //   if (err) console.log(err)
//         //   console.log('Uppdaterat: ' + huvudgrupp)
//         // })
//       })(0);
//     })
//   })
// })