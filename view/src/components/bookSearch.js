import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../utility/api';

const BookSearch = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(getAllBooks());
    }, []);

    return (
        <>
        {
            books.map((book) => (
               <div>{book}</div>
            ))
        }
        </>
    );
}

export default BookSearch;