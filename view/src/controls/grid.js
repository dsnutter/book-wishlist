import React, { useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const BookCart = (props) => {
    const gridApi = useRef();

    const onGridReady = (params) => {
        gridApi.current = params.api;
        gridApi.current.sizeColumnsToFit();
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
