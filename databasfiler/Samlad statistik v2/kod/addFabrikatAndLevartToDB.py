###################################################################
#? Lägger till kommunnummer till fält utan kommunnummer menigov2 ##
###################################################################

import pymongo
import json

#!Definition of mongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mathubben']
mydata = mydb['menigov3']

data = list(mydata.find())

counter = 0
for row in data:
  FabLevArt = str(row['Fabrikat']) + ' - ' + str(row['Fabrartnr']) 
  # print(str(row['Fabrikat']) + ' - ' + str(row['Fabrartnr']))
  mydata.update_one({'_id': row['_id']}, {'$set': {'FabLevArt': FabLevArt}})
  counter += 1
  print(counter)