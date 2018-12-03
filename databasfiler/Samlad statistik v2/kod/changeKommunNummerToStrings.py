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

data = list(mydata.find())
print(len(data))

counter = 0
for row in data:
  if len(str(row['KommunNummer'])) < 4:
    kNr = '0' + str(row['KommunNummer'])
  else:
    kNr = str(row['KommunNummer']) 
  mydata.update_one({'_id': row['_id']}, {'$set': {'KommunNummer': kNr}})
  counter += 1
  print(counter, kNr)