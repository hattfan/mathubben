var MongoClient = require('mongodb').MongoClient;

var database = "hanterausktrift"

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  var db = client.db('mathubben');
  if (err) throw err;
  db.collection(database).find({}).forEach(function (data) {
    if (err) throw err;
    data['Kronor']!=undefined? value = data['Kronor'].toString().replace(/ /g , ""):value = "";
    value = Number(value.replace(/,/g , "."))
    data['Mängd']!=undefined? amount = data['Mängd'].toString().replace(/ /g , ""):amount = "";
    amount = Number(amount.replace(/,/g , "."))

    addToDb= {
        'År' : data['År'],
        'Konsult': database,
        'Grossist': data.Grossist,
        'Kommun': data.Kommun,
        'Kronor': value,
        'Mängd': amount,
        'KommunNummer': "",
        'Benämning': data['Benämning'],
        'Varugrupp': data['Varugrupp'],
        'ArtNr':data['LevartNr'],
        'VarugruppMathubben':''
    }
    // console.log(addToDb)
    db.collection("combinedDBs").insert(addToDb, function(err, res){
        if(err) console.log(err);
        console.log(1 + " är inlagd");
    })

  })
})