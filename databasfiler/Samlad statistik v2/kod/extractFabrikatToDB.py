###################################################################
#? Plockar ut artiklar med fabrikat/levartnr/benämning ############
###################################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mydata = mydb['menigov3']
myfuturecol = mydb['fabrikat']

data = list(mydata.distinct('Fabrikat')) 

for row in data:
    # print(row)
    myfuturecol.insert_one({'Fabrikat':row})
#   counter += 1
#   print(counter)

