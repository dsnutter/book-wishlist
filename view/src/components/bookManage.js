import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../utility/api';
import Grid from '../controls/grid';

const BookManage = () => {

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

    const onChangeEdit = (params) => {
        console.log('EDIT', params.data);
    };

    const deleteRow = () => {

    };

    return (
        <>
            <Grid 
                height='450px'
                width='900px'
                rowData={books}
                columnDefs={columnDefs}
                overlayNoRowsTemplate='There are no books to add, edit, or delete'
                onCellValueChanged={onChangeEdit}
            />
        </>
    );
};

export default BookManage;

const mostColumns = {
    sortable: true,
    editable: true
};

const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Title", field: "title",  ...mostColumns },
    { headerName: "Author", field: "author", ...mostColumns }
];
