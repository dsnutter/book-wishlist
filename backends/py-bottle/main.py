import bottle
import sys
typeBackend = sys.argv[1]

if typeBackend == 'json':
    from api import booksJson
elif typeBackend == 'mongo':
    from api import booksMongo

app = application = bottle.default_app()

if __name__ == '__main__':
    bottle.run(host = '127.0.0.1', port = 8000)
