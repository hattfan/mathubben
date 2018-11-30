############################################################## 
#! Räknar mängd och kroner per artikel och per laen ########
##############################################################

import pymongo
from befolkningsDataPerLaen import befolkningsAmount
from laenKoder import laensKod

print()
#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mycombineddb = mydb['combinedDBs']
mycol = mydb["artikeldataperlaen"]

#!database-findings
dbdata = mycombineddb.find()
artNrs = mycombineddb.distinct('LevArtNrMathubben')
years = mycombineddb.distinct('År')
kommunnummer = mycombineddb.distinct('KommunNummer')
artikelNummer = list(mycombineddb.distinct('LevArtNrMathubben'))
# Skapar array av laenskoder
laenKoder = befolkningsAmount.keys()

# print(kommunnummer)

foundLaen = []
#! function för att ta ut kommunnummer hittade i mongofind:en
# TODO (VALFRI) att lägga in detta som function igen
counter = 0

# För varje artikel, kör loopen
for artikel in artikelNummer:
    counter = counter + 1
    print('Artikel nummer ', counter)

    # Loopa över åren för att ackumulera resultat
    for year in years:
        # Leta upp samtliga resultat i mycombineddb för artikelnumret och året
        dbFind = list(mycombineddb.find({"$and": [{'LevArtNrMathubben': artikel}, {'År':year}]}))

        for foundArtNrRows in dbFind:
            for laensKod in laenKoder:

                # Lägg in funna kommunnummer i foundLaen för att inte behöva loopa över samtliga kommunnnummer utan endast de som faktiskt har värden
                if str(foundArtNrRows['LaensKod']) == laensKod:
                    foundLaen.append(laensKod)
        
        
        # Gör om set till list för att det ska bli som ett object 
        myset = set(foundLaen)
        mylaenlist = list(myset)
        # print(mylaenlist)
        
        # Loopa över samtliga kommunnummer i de funna kommunnumrena och ackumulera för varje artikel
        # for kommunNr in laensKod:
            # print(kommunNr)
        for laenKod in mylaenlist:

            amount = 0
            cost = 0    
            productValues = {}
            for foundArtNrRows in dbFind:
                # print(foundArtNrRows)
                # Om funna artikelraden korresponderar till kommunnumret så ackumuleras resultatet för mängd och kronor

                if str(foundArtNrRows['LaensKod']) == laenKod:
                    
                    amount = amount + foundArtNrRows['Mängd']
                    cost = cost + foundArtNrRows['Kronor']

            
            if laenKod in befolkningsAmount:
                KronorPerCapita = cost/befolkningsAmount[laenKod]   
                AmountPerCapita = amount/befolkningsAmount[laenKod]

            else:                    
                KronorPerCapita = 0   
                AmountPerCapita = 0

            # Om kost har värde, alltså resultat har hittats för artikel och kommun, spara
            if cost != 0:
                productValues = {
                "LaenKod": laenKod,
                "Year": str(year),
                "KronorTotal": cost,
                "KronorPerCapita": KronorPerCapita,
                "MängdTotal": amount,
                "MängdPerCapita": AmountPerCapita,
                "LevArtNr": artikel,
                "Benämning": foundArtNrRows["Benämning"]}
                print(productValues)
                #! OBS INSERT into mongo
                #mycol.insert_one(productValues)