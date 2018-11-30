var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    var db = client.db('mathubben');
    if (err) throw err;
    var addToDb;
    db.collection("combinedDBs").find({}).forEach(function (data) {
        if (err) throw err;

        if(data['Grossist'] === 'Menigo' || data['Grossist'] === 'Menigo Foodservice AB' ){
            addToDb = 'Menigo'  + ' - ' +  data.ArtNr
        }
        else if(data['Grossist'] === 'Martin & Servera' || data['Grossist'] === 'Martin & Servera AB' || data['Grossist'] === 'Martin&Servera' || data['Grossist'] === 'M&S'){
            addToDb = 'M&S'  + ' - ' +  data.ArtNr
        }
        else{
            addToDb = data.Grossist + ' - ' + data.ArtNr
        }

        
        // console.log(addToDb)

        db.collection("combinedDBs").update({'_id':data['_id']},{$set :  {'LevArtNrMathubben':addToDb}}, function(err, rec){
            if(err) console.log(err);
            console.log(1 + " är inlagd");
        })
        addToDb = '';
    })
})