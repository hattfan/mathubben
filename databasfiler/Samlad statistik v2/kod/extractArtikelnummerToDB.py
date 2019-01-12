###################################################################
#? Plockar ut artiklar med fabrikat/levartnr/benämning ############
###################################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mydata = mydb['menigov3']
myfuturecol = mydb['artiklar']

data = list(mydata.aggregate( 
            [
                {"$group": { "_id": { 'FabLevArt': "$FabLevArt", 'Benämning': "$Benämning", 'Fabrikat': "$Fabrikat" } } }
            ]
        ))


for row in data:
    # print(row['_id'])
    row =  row['_id']
    myfuturecol.insert_one({'LevArtNr': str(row['FabLevArt']), 'Benamning': row['Benämning'],'Fabrikat':row['Fabrikat']})
#   counter += 1
#   print(counter)

