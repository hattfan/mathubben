import pymongo
from befolkningsDataPerKommun import befolkningsAmount
from laenKoder import laensKod
import random
from random import randrange

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
articledb = mydb['artiklar']
laenDb = mydb['dataPerLaen']

#!database-findings
# artikelNummer = articles.distinct('LevArtNrMathubben'))
# laenKoder = befolkningsAmount.keys()
years = [2015, 2016, 2017]
# foundKommuner = []
#! function för att ta ut kommunnummer hittade i mongofind:en
# TODO (VALFRI) att lägga in detta som function igen
# För varje artikel, kör loopen
# lis = [{"abc":"movies"}, {"abc": "sports"}, {"abc": "music"}, {"xyz": "music"}, {"pqr":"music"}, {"pqr":"movies"},{"pqr":"sports"}, {"pqr":"news"}, {"pqr":"sports"}]

laensKoder = set(laensKod.values())
for value in laensKoder:  
    for article in articledb.find():
        # print('article nummer ', article["LevArtNr"])
        # Loopa över åren för att ackumulera resultat  
        kronorTotal = random.uniform(1,9)*random.uniform(1,7)*1000
        kronorPerKilo = random.uniform(10,70)
        laen = ""
        if len(str(value))==1:
            laen = "0"+str(value)
        else:
            laen = str(value)

        for year in years:
            # Om cost har värde, alltså resultat har hittats för article och kommun, spara
            # if cost != 0:
            kValue = random.uniform(1.5,1.9)

            productValues = {
            "LaenKod": laen,
            "Year": str(year),
            "KronorTotal": kronorTotal*kValue*293/21,
            "KronorPerCapita": kronorTotal/9950000*kValue*293/21,
            "MangdTotal": kronorTotal/kronorPerKilo*kValue*293/21,
            "MangdPerCapita": kronorTotal/kronorPerKilo/9950000*kValue*293/21,
            "LevArtNr": article["LevArtNr"],
            "Benamning": article["Benamning"],
            "Fabrikat" : article["Fabrikat"]
            }
            # print(productValues)
            #! OBS INSERT into mongo
            laenDb.insert_one(productValues)