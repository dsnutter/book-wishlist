import React, { useEffect, useState, useRef } from 'react';
import Select from '../controls/select';
import Grid from '../controls/grid';

const BookSublist = ({ books, updateSublist, autoSize }) => {

    const gridApi = useRef();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        updateSublist.current = setCart;
    // eslint-disable-next-line
    }, []);

    const handleAddToGrid = (selectedItem) => {
        if (cart.filter(obj => obj.id === selectedItem.id).length > 0) {
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
                autoSize={autoSize}
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

