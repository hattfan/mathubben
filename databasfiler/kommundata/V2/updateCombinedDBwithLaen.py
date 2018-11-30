############################################################## 
#! Räknar mängd och kroner per artikel och per kommun ########
#! Används ej ################################################
##############################################################

import pymongo
from befolkningsDataPerLaen import befolkningsAmount
from laenKoder import laensKod

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mycombineddb = mydb['combinedDBs']

#!database-findings
dbdata = mycombineddb.find()
# laenKoder = laensKod.keys()
x = 0
for row in dbdata:
    
    if row['KommunNummer'] in laensKod:
        row['LaensKod'] = laensKod[row['KommunNummer']]
    else:
        row['LaensKod'] = 0

    # print(row['LaensKod'])
    myquery = { "_id": row['_id'] }
    newvalues = { "$set": { 'LaensKod': row['LaensKod'] } }
    
    mycombineddb.update_one(myquery, newvalues)

    print(x)
    x = x+1

    #     foundArtNrRows['LaenKod'] = laenKoder[foundArtNrRows['KommunNummer']]
        # print(foundArtNrRows)



























# foundKommuner = []
# #! function för att ta ut kommunnummer hittade i mongofind:en
# # TODO (VALFRI) att lägga in detta som function igen
# counter = 0

# # För varje artikel, kör loopen
# for artikel in artikelNummer:
#     counter = counter + 1
#     # print('Artikel nummer ', counter)

#     # Loopa över åren för att ackumulera resultat
#     for year in years:
#         # Leta upp samtliga resultat i mycombineddb för artikelnumret och året
#         dbFind = list(mycombineddb.find({"$and": [{'LevArtNrMathubben': artikel}, {'År':year}]}))

#         for foundArtNrRows in dbFind:
#             if foundArtNrRows['KommunNummer'] in laenKoder:
#                 foundArtNrRows['LaenKod'] = laenKoder[foundArtNrRows['KommunNummer']]
#                 print(foundArtNrRows)

#         for foundArtNrRows in dbFind:
#             for kommunNr in kommunnummer:
#                 # Lägg in funna kommunnummer i foundKommuner för att inte behöva loopa över samtliga kommunnnummer utan endast de som faktiskt har värden
#                 if foundArtNrRows['KommunNummer'] == kommunNr:
#                     foundKommuner.append(kommunNr)
        
#         # Gör om set till list för att det ska bli som ett object 
#         myset = set(foundKommuner)
#         mykommunlist = list(myset)
#         mylistofprodukterandkommuner = []
        
#         # Loopa över samtliga kommunnummer i de funna kommunnumrena och ackumulera för varje artikel
#         # for kommunNr in laensKod:
#             # print(kommunNr)
#         for laenKod in laenKoder:

#             amount = 0
#             cost = 0    
#             productValues = {}
#             for foundArtNrRows in dbFind:
#                 # print(foundArtNrRows)
#                 # Om funna artikelraden korresponderar till kommunnumret så ackumuleras resultatet för mängd och kronor
#                 if foundArtNrRows['KommunNummer'] in laenKoder:
#                     foundArtNrRows['LaenKod'] = laenKoder[foundArtNrRows['KommunNummer']]
                    
#                     if foundArtNrRows['LaenKod'] == laenKod:
                    
#                         amount = amount + foundArtNrRows['Mängd']
#                         cost = cost + foundArtNrRows['Kronor']
            
#             if laenKod in befolkningsAmount:
#                 KronorPerCapita = cost/befolkningsAmount[laenKod]   
#                 AmountPerCapita = amount/befolkningsAmount[laenKod]

#             else:                    
#                 KronorPerCapita = 0   
#                 AmountPerCapita = 0

#             # Om kost har värde, alltså resultat har hittats för artikel och kommun, spara
#             if cost != 0:
#                 productValues = {
#                 "LaenKod": laenKod,
#                 "Year": str(year),
#                 "KronorTotal": cost,
#                 "KronorPerCapita": KronorPerCapita,
#                 "MängdTotal": amount,
#                 "MängdPerCapita": AmountPerCapita,
#                 "LevArtNr": artikel,
#                 "Benämning": foundArtNrRows["Benämning"]}
#                 # print(productValues)
#                 #! OBS INSERT into mongo
#                 # mycol.insert_one(productValues)