const API_ENDPOINT = 'http://localhost:8000/books';

async function getAllBooks() {
    let data = null;

    let response = await fetch(API_ENDPOINT);
    data = await response.json();    

    return data;  
}

async function deleteBook(id) {
    let result = false;
    await fetch(API_ENDPOINT + '/' + id,
            {
                method: 'DELETE'
            })
        .then(response => {
            result = response.ok;
        });
    return result;
}

async function addBook(book) {
    let result = false;
    await fetch(API_ENDPOINT,
            {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then(response => {
            result = response.ok;
        });
    return result;
}

async function editBook(oldId, newBook) {
    let result = false;
    await fetch(API_ENDPOINT + '/' + oldId,
            {
                method: 'PUT',
                body: JSON.stringify(newBook),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then(response => {
            result = response.ok;
        });
    return result;
}

export { getAllBooks, deleteBook, addBook, editBook };
