import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../utility/api';
import Select from '../controls/select';

const BookSearch = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setBooks(await getAllBooks());    
            } catch (e) {
                console.error("Failed to get all books:", e);
            }
        })();
    }, []);

    return (
        <>
            <Select 
                options={books}
                getOptionValue={(book) => book.id}
                getOptionLabel={(book) => book.title}
                isSearchable={true}
                placeholder='Search...'
            />

        </>
    );
}

export default BookSearch;