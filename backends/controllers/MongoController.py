import pymongo
from bson.json_util import dumps, loads
from controllers import AbstractController

class MongoController(AbstractController):

    dbname = None
    mydb = None
    collectionName = None
    collection = None
    mongoLocation = "mongodb://localhost:27017/"

    def __init__(self, dbname, collectionName):
        self.dbname = dbname
        self.collectionName = collectionName
        super().__init__()

    def setupdb():
        myclient = pymongo.MongoClient(self.mongoLocation)
        self.mydb = myclient[self.dbname]

        self.collection = mydb[self.collectionName]

    def rebuildInitialDb(jsonFile):
        data = []

        # reset previous values
        self.collection.drop()

        # load all values
        with open(jsonFile) as json_file:
            data = json.load(json_file)

        # insert all values into mongo
        self.collection.insert_many(data)

    def printCollections():
        print(self.mydb.list_collection_names())

    def getAll():
        items = self.collection.find({})
        converted = dumps(items)
        return converted

    def getOne(json):
        map = dict(json)
        item = self.collection.find_one({ 'id': map['id'] })
        return item

    def delete(id):
        self.collection.delete_one( { 'id': id } )

    def add(json):
        obj = getOne(json)
        # if the object does not exist already, insert it
        if obj is None:
            self.collection.insert_one(json)
            return dumps(json)

    def update(json):
        obj = getOne(self.collection, json)
        map = dict(json)
        self.collection.update_one(obj, { '$set': json })
        return dumps(obj)
