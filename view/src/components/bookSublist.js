import React, { useEffect, useState, useRef } from 'react';
import Select from '../controls/select';
import Grid from '../controls/grid';
import { ACTION } from '../utility/constants';

const BookSublist = ({ books, refreshBooks, action }) => {

    const gridApi = useRef();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        refreshBooks();
    }, []);

    useEffect(() => {
        switch (action) {
            case ACTION.EDIT:
                // // in both, EDIT??
                // const edit = books.filter(a => cart.some(b => comparator(a, b)));
                break;
            case ACTION.DELETE:
                // only want items in cart, that are in books
                setCart(old => old.filter(a => books.some(b => compareBooks(a, b))));
                break;
            case ACTION.ADD:
                // in books, not in cart, ADD
                // const add = books.filter(a => !cart.some(b => comparator(a, b)));
                break;
            default:
                break;
        }
    }, [books, setCart, action]);

    const handleAddToGrid = (selectedItem) => {
        if (cart.includes(selectedItem)) {
            return;
        }
        setCart(old => [...old, selectedItem]);
    };

    return (
        <>
            <Select 
                options={books}
                getOptionValue={(book) => book}
                getOptionLabel={(book) => book.title}
                isSearchable={true}
                placeholder='Search...'
                onChange={handleAddToGrid}
            />
            <br />
            <Grid 
                gridApi={gridApi}
                height='450px'
                width='900px'
                rowData={cart}
                columnDefs={columnDefs}
                overlayNoRowsTemplate='To add items to this cart, search in the box above'
            />
        </>
    );
}

export default BookSublist;

const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Title", field: "title", sortable: true },
    { headerName: "Author", field: "author", sortable: true }
];

const compareBooks = (book1, book2) => {
    return book1.id === book2.id && book1.title === book2.title && book1.author === book2.author
};  
