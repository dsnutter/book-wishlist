from abc import ABC, abstractmethod

class AbstractController(ABC):

    @abstractmethod
    def setupdb(self):
        pass

    @abstractmethod
    def rebuildInitialDb(self, jsonFile):
        pass

    @abstractmethod
    def getAll(self):
        pass

    @abstractmethod
    def delete(self, id):
        pass

    @abstractmethod
    def add(self, json):
        pass

    @abstractmethod
    def update(self, json):
        pass
