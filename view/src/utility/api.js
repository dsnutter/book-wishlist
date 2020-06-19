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

const addBook = (book) => {

}

const editBook = (id, newBook) => {

}

export { getAllBooks, deleteBook, addBook, editBook };

// fetch('https://api.randomservice.com/dog', {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer 123abc456def'
//   },
//   body: {
//     name: 'Roger',
//     age: 8
//   }
// })
//   .then(response => {
//     console.log(response)
//   })
//   .catch(err => {
//     console.log(err)
//   })