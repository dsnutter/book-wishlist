import pymongo
import json

mydb = None

def setupdb(dbname, collectionName):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient[dbname]

    collection = mydb[collectionName]

    return collection

def rebuildInitialDb(collection, jsonFile):
    data = []

    with open(jsonFile) as json_file:
        data = json.load(json_file)

    collection.insert_many(data)

    printCollections()

def printCollections():
    print(mydb.list_collection_names())
