###########################################################
#? Lägger till kommunnummer & laenskod till menigov3 ##
###########################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mykommunnummer = mydb['menigoKommunNummer']
mydata = mydb['menigov3']

data = list(mydata.find())
kommunnummer = list(mykommunnummer.find())

counter = 0
for row in data:
  for x in kommunnummer:
    if x['Kommun'] == row['KommunFörvaltning']:
      mydata.update_one({'_id': row['_id']}, 
      {'$set': {'KommunNummer': x['Kommunnummer'], 
      'LaenKod':x['Kommunnummer'][:2]}})
      counter += 1
      print(counter)