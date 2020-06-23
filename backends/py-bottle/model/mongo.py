import pymongo
from bson.json_util import dumps, loads
import json

mydb = None

def setupdb(dbname, collectionName):
    global mydb
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient[dbname]

    collection = mydb[collectionName]

    return collection

def rebuildInitialDb(collection, jsonFile):
    data = []

    # reset previous values
    collection.drop()

    # load all values
    with open(jsonFile) as json_file:
        data = json.load(json_file)

    # insert all values into mongo
    collection.insert_many(data)

    # printCollections()

def printCollections():
    global mydb
    print(mydb.list_collection_names())

def getAll(collection):
    items = collection.find({})
    converted = dumps(items)
    return converted

def getOne(collection, json):
    map = dict(json)
    item = collection.find_one({ 'id': map['id'] })
    return item

def delete(collection, id):
    collection.delete_one( { 'id': id } )

def add(collection, json):
    obj = getOne(collection, json)
    # if the object does not exist already, insert it
    if obj is None:
        collection.insert_one(json)
        return dumps(json)

def update(collection, json):
    obj = getOne(collection, json)
    map = dict(json)
    collection.update_one(obj, { '$set': json })
    return dumps(obj)

