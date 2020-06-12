import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["booksdb"]

bookCollection = mydb["books"]

print(mydb.list_collection_names())

