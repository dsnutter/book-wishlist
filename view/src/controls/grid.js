import React, { useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const BookCart = (props) => {

    useEffect(() => {
        if (!props.gridApi.current) return;
        if (props.autoSize) props.gridApi.current.sizeColumnsToFit();
    }, [props.autoSize, props.gridApi]);

    const onGridReady = (params) => {
        props.gridApi.current = params.api;
        if (props.autoSize) props.gridApi.current.sizeColumnsToFit();
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
