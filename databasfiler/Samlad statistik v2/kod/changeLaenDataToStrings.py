###################################################################
#? Lägger till kommunnummer till fält utan kommunnummer menigov2 ##
###################################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mydata = mydb['dataPerLaen']

data = list(mydata.find())

counter = 0
for row in data:
  mydata.update_one({'_id': row['_id']}, {'$set': {'LevArtNr': str(row['LevArtNr'])}})
  counter += 1
  print(counter)