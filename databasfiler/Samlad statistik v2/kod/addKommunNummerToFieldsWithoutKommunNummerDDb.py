###################################################################
#? Lägger till kommunnummer till fält utan kommunnummer menigov2 ##
###################################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mykommunnummer = mydb['menigoKommunNummer']
mydata = mydb['menigov2']

data = list(mydata.find({'KommunNummer':{'$exists':False}}))

print(len(data))

counter = 0
for row in data:
  mydata.update_one({'_id': row['_id']}, {'$set': {'KommunNummer': ''}})
  counter += 1
  print(counter)