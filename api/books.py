from bottle import request, response
from bottle import post, get, put, delete
import json

data = dict()

@post('/books')
def create(): 
    print("/books: executing POST")

    getCurrentBooks()

    book = None
    try:
        # parse input data
        try:
            book = request.json
            # checks if already in list
            if book in data:
                raise ValueError
            data.append(book)
        except:
            raise ValueError

        if book is None:
            raise ValueError

    except ValueError:
        # if bad request data, return 400 Bad Request
        response.status = 400
        return

    # return 200 Success
    print(data)
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(book)

@get('/books')
def listing():
    print("/books: executing GET")

    getCurrentBooks()

    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(data)

@put('/books/<id>')
def update(id):
    print("/books: executing EDIT")

    getCurrentBooks()

    newBook = None
    try:
        for book in data:
            if book['id'] == id:
                data.remove(book)
                newBook = request.json
                data.append(newBook)
                break
        if newBook is None:
            raise KeyError
    except KeyError:
        # does not exist
        response.status = 400
        return

    print(newBook)
    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(newBook)

@delete('/books/<id>')
def delete(id):
    print("/books: executing DELETE")

    getCurrentBooks()

    removed = None
    try:
        for book in data:
            if book['id'] == id:
                data.remove(book)
                removed = book
                break
        if removed is None:
            raise KeyError
    except KeyError:
        # does not exist
        response.status = 400
        return

    # return 200 Success
    print(removed)
    response.status = 200
    return

def getCurrentBooks():
    global data
    # if books already exist, then ignore the retrieval
    if len(data) == 0:
        with open('model/fullIndex.json') as json_file:
            data = json.load(json_file)
