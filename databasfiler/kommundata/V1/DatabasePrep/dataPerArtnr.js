var MongoClient = require('mongodb').MongoClient;
var befolkning = require('../../../mathubben-admintemplated/views/js/kommundata')
var kommunnamn = require('../../../mathubben-admintemplated/views/js/kommunnamn')
var dataPerArtnr = require('./artikelnamn')

// console.log(dataPerArtnr)

// var artNr = ['Menigo - 712135', 'Menigo - 775209', 'Menigo - 402076']

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) throw err;
  var db = client.db('mathubben');

  var years = ['2015', '2016', '2017']
  
  db.collection("combinedDBs").distinct('LevArtNrMathubben', function (err, produktArr) {
    console.log(produktArr)
    if (err) throw err;
    // console.log(produktArr.length)
    db.collection("combinedDBs").distinct("KommunNummer", function (err, kommunData) {
      if (err) throw err
      dataPerArtnr.forEach(produkt => {
        // artNr.forEach(produkt => {
        console.log(produkt)
        var kommunVikt = {};
        //Loopar över kommunnumerna
        for (let i = 0; i < kommunData.length; i++) {
          const kommun = kommunData[i];

          kommunVikt[kommun] = {
            2015: {
              'Mängd': 0,
              'Kronor': 0
            },
            2016: {
              'Mängd': 0,
              'Kronor': 0
            },
            2017: {
              'Mängd': 0,
              'Kronor': 0
            },
          }
        }
        // console.log(produkt)
        db.collection("combinedDBs").find({
          // 'LevArtNrMathubben': produkt
          'LevArtNrMathubben': produkt

        }).toArray(function (err, mathubbenStatistik) {
          if (err) throw err;

          // console.log(mathubbenStatistik)
          for (let i = 0; i < mathubbenStatistik.length; i++) {
            // console.log(mathubbenStatistik[i])
            //Loopear över kommunnummerna och letar om de finns i mathubbenstatistiken
            if (mathubbenStatistik[i]['KommunNummer'] in kommunVikt) {
              vikt = mathubbenStatistik[i]['Mängd'];
              kronor = mathubbenStatistik[i]['Kronor'];
              //vikt countar över mängden i varje statistik-rad
              if (mathubbenStatistik[i]['År'] === 2015) {
                kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Mängd'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Mängd'] + Math.round((vikt * 100) / 100);
                kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Kronor'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2015]['Kronor'] + Math.round((kronor * 100) / 100);
              } else if (mathubbenStatistik[i]['År'] === 2016) {
                kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Mängd'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Mängd'] + Math.round((vikt * 100) / 100);
                kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Kronor'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2016]['Kronor'] + Math.round((kronor * 100) / 100);
              } else if (mathubbenStatistik[i]['År'] === 2017) {
                kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Mängd'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Mängd'] + Math.round((vikt * 100) / 100);
                kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Kronor'] = kommunVikt[mathubbenStatistik[i]['KommunNummer']][2017]['Kronor'] + Math.round((kronor * 100) / 100);
              }

              vikt = "";
            }
          }

          var temp = {}
          for (const key in kommunVikt) {
            years.forEach(year => {

              temp = {
                'KommunNummer': key.replace(/ /g, "_"),
                'KommunNamn': kommunnamn[key.replace(/ /g, "_")],
                'Year': year,
                // 'Producent' : producent,
                // 'Produktnamn' : produkt,
                'MängdTotal': kommunVikt[key][year]['Mängd'],
                'KronorTotal': kommunVikt[key][year]['Kronor'],
                'MängdPerCapita': kommunVikt[key][year]['Mängd'] / befolkning[key],
                'KronorPerCapita': kommunVikt[key][year]['Kronor'] / befolkning[key],
                'LevArtNr': produkt
                // 'LevArtNr'

              }
              
              console.log('*********************************************************************************************************')
              console.log(temp)
              
              db.collection('produkter').insert(temp, function (err, res) {
                if (err) throw err
                console.log(res.insertedCount)
                
              })
              temp = {}
            })
          }
        })
      })
    })
  })
})