from controllers.abstractController import AbstractController
import json

class InMemoryController(AbstractController):

    data = None

    def setupdb(self):
        self.data = dict()

    def rebuildInitialDb(self, jsonFile):
        # if books already exist, then ignore the retrieval
        if len(self.data) == 0:
            with open(jsonFile) as json_file:
                self.data = json.load(json_file)

    def getAll(self):
        return json.dumps(self.data)

    def delete(self, id):
        removed = None
        for book in self.data:
            if book['id'] == id:
                self.data.remove(book)
                removed = book
                break
        if removed is None:
            raise KeyError

    def add(self, json):
        # checks if already in list
        if json in self.data:
            raise ValueError
        self.data.append(json)

    def update(self, json):
        newBook = None
        map = dict(json)
        for book in self.data:
            if book['id'] == map['id']:
                self.data.remove(book)
                newBook = json
                self.data.append(newBook)
                break
        if newBook is None:
            raise KeyError
        return newBook
