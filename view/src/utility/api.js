const API_ENDPOINT = 'http://localhost:8000/books';

async function getAllBooks() {
    let data = null;

    let response = await fetch(API_ENDPOINT);
    data = await response.json();    

    return data;  
}

const deleteBook = (id) => {

}

const addBook = (book) => {

}

const editBook = (id, newBook) => {

}

export { getAllBooks, deleteBook, addBook, editBook };
