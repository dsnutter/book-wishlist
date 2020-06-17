import React, { useEffect, useState, useRef } from 'react';
import { getAllBooks } from '../utility/api';
import Select from '../controls/select';
import Grid from '../controls/grid';

const BookSublist = () => {

    const gridApi = useRef();

    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setBooks(await getAllBooks());    
            } catch (e) {
                console.error("Failed to get all books:", e);
            }
        })();
    }, []);

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
