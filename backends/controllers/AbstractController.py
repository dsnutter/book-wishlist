from abc import ABC, abstractmethod

class AbstractController(ABC):

    def setupdb():
        pass
    def rebuildInitialDb(jsonFile):
        pass
    def getAll():
        pass
    def getOne(json):
        pass
    def delete(id):
        pass
    def add(json):
        pass
    def update(json):
        pass
