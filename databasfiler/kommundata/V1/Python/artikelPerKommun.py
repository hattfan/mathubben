import pymongo
from befolkningsDataPerKommun import befolkningsAmount

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mycombineddb = mydb['combinedDBs']
mycol = mydb["artikeldata"]

#!database-findings
dbdata = mycombineddb.find()
artNrs = mycombineddb.distinct('LevArtNrMathubben')
years = mycombineddb.distinct('År')
kommunnummer = mycombineddb.distinct('KommunNummer')
artikelNummer = list(mycombineddb.distinct('LevArtNrMathubben'))

foundKommuner = []
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

            # Lägg in funna kommunnummer i foundKommuner för att inte behöva loopa över samtliga kommunnnummer utan endast de som faktiskt har värden
            for kommunNr in kommunnummer:
                if foundArtNrRows['KommunNummer'] == kommunNr:
                    foundKommuner.append(kommunNr)

        # Gör om set till list för att det ska bli som ett js-object 
        myset = set(foundKommuner)
        mykommunlist = list(myset)
        mylistofprodukterandkommuner = []

        # Loopa över samtliga kommunnummer i de funna kommunnumrena och ackumulera för varje artikel        
        for kommunNr in mykommunlist:
            amount = 0
            cost = 0    
            productValues = {}
            for foundArtNrRows in dbFind:
                # Om funna artikelraden korresponderar till kommunnumret så ackumuleras resultatet för mängd och kronor
                # print(foundArtNrRows)
                if foundArtNrRows['KommunNummer'] == kommunNr:
                    
                    amount = amount + foundArtNrRows['Mängd']
                    cost = cost + foundArtNrRows['Kronor']

            
            if kommunNr in befolkningsAmount:
                KronorPerCapita = cost/befolkningsAmount[kommunNr]   
                AmountPerCapita = amount/befolkningsAmount[kommunNr]

            else:                    
                KronorPerCapita = 0   
                AmountPerCapita = 0

            # Om cost har värde, alltså resultat har hittats för artikel och kommun, spara
            if cost != 0:
                productValues = {
                "KommunNummer": kommunNr,
                "Year": str(year),
                "KronorTotal": cost,
                "KronorPerCapita": KronorPerCapita,
                "MängdTotal": amount,
                "MängdPerCapita": AmountPerCapita,
                "LevArtNr": artikel,
                "Benämning": foundArtNrRows["Benämning"]}
                # print(productValues)
                #! OBS INSERT into mongo
                mycol.insert_one(productValues)