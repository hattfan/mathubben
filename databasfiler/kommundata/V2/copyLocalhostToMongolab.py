############################################################## 
#? Lägger in databaserna från localhost till mlab ############
##############################################################

import pymongo

#!Definition of mongo
mylocalhostClient = pymongo.MongoClient("mongodb://localhost:27017/")
mymlabClient = pymongo.MongoClient("mongodb://ola:Neroxrox5(@ds235732.mlab.com:35732/mathubben")
mymlabdb = mymlabClient['mathubben']
mylocalhostdb = mylocalhostClient['mathubben']
mylocalcol = mylocalhostdb['dataSverige']
mymlabcol = mymlabdb['dataSverige']
# menigov2 = mydb['menigov2']
# mycol = mydb["dataPerKommun"]

#!database-findings
dbdata = mylocalcol.find()
counter = 0
for x in dbdata:
    x.pop('_id')
    # print(x)
    mymlabcol.insert_one(x)
    print('Rad nummer: ' + str(counter))
    counter = counter + 1

    
# artNrs = menigov2.distinct('Fabrartnr')
# years = menigov2.distinct('År')
# kommunnummer = menigov2.distinct('KommunNummer')
# artikelNummer = list(menigov2.distinct('Fabrartnr'))

# foundKommuner = []
# #! function för att ta ut kommunnummer hittade i mongofind:en
# # TODO (VALFRI) att lägga in detta som function igen
# counter = 0
# # För varje artikel, kör loopen
# for artikel in artikelNummer:
#     counter = counter + 1
#     print('Artikel nummer ', counter)
#     # Loopa över åren för att ackumulera resultat    
#     for year in years:
#         # Leta upp samtliga resultat i menigov2 för artikelnumret och året
#         dbFind = list(menigov2.find({"$and": [{'Fabrartnr': artikel}, {'År':year}]}))
#         for foundArtNrRows in dbFind:

#             # Lägg in funna kommunnummer i foundKommuner för att inte behöva loopa över samtliga kommunnnummer utan endast de som faktiskt har värden
#             for kommunNr in kommunnummer:
#                 if foundArtNrRows['KommunNummer'] == kommunNr:
#                     foundKommuner.append(kommunNr)

#         # Gör om set till list för att det ska bli som ett js-object 
#         myset = set(foundKommuner)
#         mykommunlist = list(myset)
#         mylistofprodukterandkommuner = []

#         # Loopa över samtliga kommunnummer i de funna kommunnumrena och ackumulera för varje artikel        
#         for kommunNr in mykommunlist:
#             amount = 0.0
#             cost = 0.0    
#             productValues = {}
#             for foundArtNrRows in dbFind:
#                 # Om funna artikelraden korresponderar till kommunnumret så ackumuleras resultatet för mängd och kronor
#                 # print(foundArtNrRows)
#                 if foundArtNrRows['KommunNummer'] == kommunNr:
#                     if(isinstance(foundArtNrRows['VolymAnb'],int)):
#                         amount = amount + float(int(foundArtNrRows['VolymAnb']))
#                     elif(isinstance(foundArtNrRows['VolymAnb'],float)):
#                         amount = amount + float(foundArtNrRows['VolymAnb'])

#                     if(isinstance(foundArtNrRows['BeloppAnb'],int)):
#                         cost = cost + float(foundArtNrRows['BeloppAnb'])
#                     elif(isinstance(foundArtNrRows['BeloppAnb'],float)):
#                         cost = cost + float(foundArtNrRows['BeloppAnb'])
                    
            
#             if kommunNr in befolkningsAmount:
#                 KronorPerCapita = cost/befolkningsAmount[str(kommunNr)]   
#                 AmountPerCapita = amount/befolkningsAmount[str(kommunNr)]

#             else:                    
#                 KronorPerCapita = 0   
#                 AmountPerCapita = 0

#             # Om cost har värde, alltså resultat har hittats för artikel och kommun, spara
#             if cost != 0:
#                 productValues = {
#                 "KommunNummer": kommunNr,
#                 "Year": str(year),
#                 "KronorTotal": cost,
#                 "KronorPerCapita": KronorPerCapita,
#                 "MangdTotal": amount,
#                 "MangdPerCapita": AmountPerCapita,
#                 "LevArtNr": artikel,
#                 "Fabrikat" : foundArtNrRows["Fabrikat"],
#                 "Benamning": foundArtNrRows["Benämning"]}
#                 # print(productValues)
#                 #! OBS INSERT into mongo
#                 mycol.insert_one(productValues)