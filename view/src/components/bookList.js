import React from 'react';
import BookSublist from './bookSublist';
import BookManage from './bookManage';

const BookList = () => {

    return (
        <>
            <h2>Create Sublist</h2>
            <BookSublist />

            <h2>Manage Full List</h2>
            <BookManage />
        </>
    );
};

export default BookList;