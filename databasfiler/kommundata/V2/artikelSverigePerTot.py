############################################################## 
#? Räknar mängd och kroner per artikel och per kommun ########
##############################################################

import pymongo

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
menigov3 = mydb['menigov3']
mycol = mydb["artikelSamtligaYears"]

#!database-findings
dbdata = menigov3.find()
artNrs = menigov3.distinct('FabLevArt')
years = menigov3.distinct('År')
artikelNummer = list(menigov3.distinct('FabLevArt'))

inhabitantsSweden = 9995000

#! function för att ta ut LaenKod hittade i mongofind:en
# TODO (VALFRI) att lägga in detta som function igen
counter = 0
# För varje artikel, kör loopen
for artikel in artikelNummer:
    counter = counter + 1
    print('Artikel nummer ', counter)
    # Loopa över åren för att ackumulera resultat    
    # Leta upp samtliga resultat i menigov3 för artikelnumret och året
    dbFind = list(menigov3.find({'FabLevArt': artikel})
# dbFind = list(menigov3.find({"$and": [{'FabLevArt': artikel}, {'År':2017}]}))
    c = 0
    amount = 0.0
    cost = 0.0
    for foundArtNrRows in dbFind:
        c = c+1
        amount = amount + float(foundArtNrRows['VolymAnb'])
        cost = cost + float(foundArtNrRows['BeloppAnb'])

    # Om cost har värde, alltså resultat har hittats för artikel och kommun, spara
    if cost != 0:
        productValues = {
        "Year": str(year),
        "KronorTotal": cost,
        "KronorPerCapita": cost/inhabitantsSweden,
        "MangdTotal": amount,
        "MangdPerCapita": amount/inhabitantsSweden,
        "LevArtNr": artikel,
        "Fabrikat" : foundArtNrRows["Fabrikat"],
        "Benamning": foundArtNrRows["Benämning"]}
        # print(productValues)
        #! OBS INSERT into mongo
        mycol.insert_one(productValues)