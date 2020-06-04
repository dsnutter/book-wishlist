from bottle import request, response
from bottle import post, get, put, delete

_names = set()                    # the set of names

@post('/books')
def create(): 
    pass

@get('/books')
def listing():
    print "testing"
    pass

@put('/books/<id>')
def update(id):
    pass

@delete('/books/<id>')
def delete(id):
    pass

