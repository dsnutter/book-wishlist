import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const BookCart = (props) => {

    const onGridReady = (params) => {
        props.gridApi.current = params.api;
        props.gridApi.current.sizeColumnsToFit();
    };
    
    return (
        <div
            className="ag-theme-balham"
            style={{ height: props.height, width: props.width }}
        >
            <AgGridReact 
                pagination={true}
                onGridReady={onGridReady}
                rowSelection='single'
                {...props} 
            />
        </div>
    );
};

export default BookCart;
