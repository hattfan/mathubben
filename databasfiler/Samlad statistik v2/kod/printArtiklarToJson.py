###################################################################
#? Plockar ut artiklar med fabrikat/levartnr/benämning ############
###################################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mydata = mydb['artiklar']

data = list(mydata.find())

with open('output.json', 'a') as the_file:
    # the_file.write('Hello\n')

    for row in data:
        the_file.write('{"LevArtNr"' + ':"' + row['LevArtNr'] + '","Benamning":"' + row['Benamning'] + '","Fabrikat":"'+ row['Fabrikat'] + '"},' + "\n")
        # row =  row['_id']
        # myfuturecol.insert_one({'LevArtNr': str(row['Fabrartnr']), 'Benamning': row['Benämning'],'Fabrikat':row['Fabrikat']})
    #   counter += 1
    #   print(counter)

