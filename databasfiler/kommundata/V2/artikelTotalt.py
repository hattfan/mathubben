############################################################## 
#? Räknar mängd och kroner per artikel och per kommun ########
##############################################################

import pymongo
from befolkningsDataPerKommun import befolkningsAmount

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
menigov3 = mydb['menigov3']
mycol = mydb["dataPerLaen"]

#!database-findings
dbdata = menigov3.find()
artNrs = menigov3.distinct('Fabrartnr')
years = menigov3.distinct('År')
laenKoder = menigov3.distinct('LaenKod')
artikelNummer = list(menigov3.distinct('Fabrartnr'))
# artikelNummer = [210121]

foundLaen = []
#! function för att ta ut LaenKod hittade i mongofind:en
# TODO (VALFRI) att lägga in detta som function igen
counter = 0
# För varje artikel, kör loopen
for artikel in artikelNummer:
    counter = counter + 1
    print('Artikel nummer ', counter)
    # Loopa över åren för att ackumulera resultat    
    for year in years:
        # Leta upp samtliga resultat i menigov3 för artikelnumret och året
        dbFind = list(menigov3.find({"$and": [{'Fabrartnr': artikel}, {'År':year}]}))
        
        for foundArtNrRows in dbFind:

        # Gör om set till list för att det ska bli som ett js-object och ha unika endast
        myset = set(foundLaen)
        mylaenlist = list(myset)

        # print(mylaenlist)
        # print(foundLaen)
        # Loopa över samtliga LaenKod i de funna kommunnumrena och ackumulera för varje artikel        
        for laenNr in mylaenlist:
            amount = 0.0
            cost = 0.0    
            productValues = {}
            for foundArtNrRows in dbFind:
                # print(foundArtNrRows['LaenKod'])
                # Om funna artikelraden korresponderar till kommunnumret så ackumuleras resultatet för mängd och kronor
                if foundArtNrRows['LaenKod'] in laenNr:
                    amount = amount + float(foundArtNrRows['VolymAnb'])
                    cost = cost + float(foundArtNrRows['BeloppAnb'])

            if laenNr in befolkningsAmount:
                KronorPerCapita = cost/10000000  
                AmountPerCapita = amount/10000000
            else:                    
                KronorPerCapita = 0   
                AmountPerCapita = 0

            # Om cost har värde, alltså resultat har hittats för artikel och kommun, spara
            if cost != 0:
                productValues = {
                "Year": str(year),
                "KronorTotal": cost,
                "KronorPerCapita": KronorPerCapita,
                "MangdTotal": amount,
                "MangdPerCapita": AmountPerCapita,
                "LevArtNr": artikel,
                "Fabrikat" : foundArtNrRows["Fabrikat"],
                "Benamning": foundArtNrRows["Benämning"]}
                # print(productValues)
                #! OBS INSERT into mongo
                mycol.insert_one(productValues)