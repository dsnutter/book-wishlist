const ENDPOINT = 'http://127.0.0.1:8000/books';

const getAllBooks = () => {
    let books = [];
    async function get() {
        books = await fetch(ENDPOINT)
            .then(response => response.json());
            // .then((data) => {
            //     books = data
            // })
            // .catch(console.log)
    };
    get();
    console.log('books: ', books);
    return books;
}

const deleteBook = (id) => {

}

const addBook = (book) => {

}

const editBook = (id, newBook) => {

}

export { getAllBooks, deleteBook, addBook, editBook };
