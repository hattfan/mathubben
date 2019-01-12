############################################################## 
#? Lägger in databaserna från localhost till mlab ############
##############################################################

import pymongo

#!Definition of mongo
mylocalhostClient = pymongo.MongoClient("mongodb://localhost:27017/")
mymlabClient = pymongo.MongoClient("mongodb://ola:Neroxrox5(@ds235732.mlab.com:35732/mathubben")
mymlabdb = mymlabClient['mathubben']
mylocalhostdb = mylocalhostClient['mathubben']
mylocalcol = mylocalhostdb['fabrikat']
mymlabcol = mymlabdb['fabrikat']

#!database-findings
dbdata = mylocalcol.find()
counter = 0
for x in dbdata:
    x.pop('_id')
    # print(x)
    mymlabcol.insert_one(x)
    print('Rad nummer: ' + str(counter))
    counter = counter + 1