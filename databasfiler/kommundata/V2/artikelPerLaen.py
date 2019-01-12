############################################################## 
#? Räknar mängd och kroner per artikel och per kommun ########
##############################################################

import pymongo
from befolkningsDataPerLaen import befolkningsAmount

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
menigov3 = mydb['menigov3']
mycol = mydb["dataPerLaen2"]

#!database-findings
dbdata = menigov3.find()
artNrs = menigov3.distinct('FabLevArt')
years = menigov3.distinct('År')
laenKoder = menigov3.distinct('LaenKod')
artikelNummer = list(menigov3.distinct('FabLevArt'))
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
        dbFind = list(menigov3.find({"$and": [{'FabLevArt': artikel}, {'År':year}]}))
    # dbFind = list(menigov3.find({"$and": [{'FabLevArt': artikel}, {'År':2017}]}))
        c = 0
        for foundArtNrRows in dbFind:
            c = c+1
            # print(year, c, foundArtNrRows['LaenKod'])
            # print(c, foundArtNrRows['LaenKod'])
            # Lägg in funna LaenKod i foundLaen för att inte behöva loopa över samtliga kommunnnummer utan endast de som faktiskt har värden
            for laenNr in laenKoder:
                if foundArtNrRows['LaenKod'] == laenNr:
                    foundLaen.append(laenNr)

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
                KronorPerCapita = cost/befolkningsAmount[str(laenNr)]   
                AmountPerCapita = amount/befolkningsAmount[str(laenNr)]
            else:                    
                KronorPerCapita = 0   
                AmountPerCapita = 0

            # Om cost har värde, alltså resultat har hittats för artikel och kommun, spara
            if cost != 0:
                productValues = {
                "LaenKod": laenNr,
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