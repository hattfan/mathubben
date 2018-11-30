import pymongo

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mycombineddb = mydb['combinedDBs']
mycol = mydb["artikeldataperlaen"]

mylookupclient = myclient['dabas']
mylookupdb = mylookupclient['martinservera']

#!database-findings
dbdata = mycombineddb.find()
artNrs = mycombineddb.distinct('LevArtNrMathubben')
years = mycombineddb.distinct('År')
kommunnummer = mycombineddb.distinct('KommunNummer')
artikelNummer = list(mycombineddb.distinct('LevArtNrMathubben'))

foundLaen = []
#! function för att ta ut kommunnummer hittade i mongofind:en
# TODO (VALFRI) att lägga in detta som function igen
counter = 0

# För varje artikel, kör loopen
for artikel in artikelNummer:
  grossist = artikel.split("-")[0]
  grossist = grossist[:-1]
  artikelNr = artikel.split("-")[1]
  artikelNr = "".join(artikelNr.split())
  
  if(grossist == 'Menigo'):
    print(artikelNr, len(artikelNr))
    print(artikel)