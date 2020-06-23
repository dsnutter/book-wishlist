import sys
sys.path.append('../')

from bottle import request, response
from bottle import post, get, put, delete, route
import json
from controllers import MongoController

controller = MongoController('booksdb', 'books')
controller.setupdb()
controller.rebuildInitialDb('model/fullIndex.json')

@post('/books')
def create(): 
    add_cors_headers()
    print("/books: executing POST/ADD")

    jsonBook = None
    # parse input data
    try:
        book = request.json

        jsonBook = controller.add(book)
        print("add book:", jsonBook, " to JSON POST")
    except:
        # if bad request data, return 400 Bad Request
        response.status = 400
        return

    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return jsonBook

@get('/books')
def listing():
    add_cors_headers()
    print("/books: executing GET")

    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return controller.getAll()

@put('/books/<id>')
def update(id):
    add_cors_headers()
    print("/books/", id, ": executing PUT/EDIT")

    jsonBook = None
    try:
        book = request.json
        jsonBook = controller.update(book)
    except:
        response.status = 400
        return

    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return jsonBook

@delete('/books/<id>')
def delete(id):
    add_cors_headers()
    print("/books/", id, ": executing DELETE")

    try:
        controller.delete(id)
    except:
        # on any error, return 400
        response.status = 400
        return

    # return 200 Success
    response.status = 200
    return

@route('/books/<id>', method='OPTIONS')
def options(id):
    add_cors_headers()
    print("/books/", id, ": executing OPTIONS")

@route('/books', method='OPTIONS')
def options():
    add_cors_headers()
    print("/books: executing OPTIONS")

def add_cors_headers():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'