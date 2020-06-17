import React, { useEffect, useState, useRef } from 'react';
import { getAllBooks } from '../utility/api';
import Grid from '../controls/grid';
import Modal from 'react-modal';

const BookManage = () => {

    const gridApi = useRef();

    const [books, setBooks] = useState([]);
    const [addIsOpen, setAddIsOpen] = useState(false);

    const [tempModalTitle, setTempModalTitle] = useState();
    const [tempModalAuthor, setTempModalAuthor] = useState();
    const [tempModalId, setTempModalId] = useState();

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
        const nodes = gridApi.current.getSelectedNodes();
        console.log("DELETE", nodes[0].data);
    };

    const addRow = () => {
        setBooks(old => [ ...old, { id: tempModalId, title: tempModalTitle, author: tempModalAuthor } ]);
        gridApi.current.setRowData(books)        

        console.log("ADD");
        setAddIsOpen(false);
    };

    const onOpenAddModal = () => {
        setAddIsOpen(true);
    }

    return (
        <>
            <button onClick={deleteRow}>Delete</button>
            <button onClick={onOpenAddModal}>Add</button>
            <Grid 
                gridApi={gridApi}
                height='450px'
                width='900px'
                rowData={books}
                columnDefs={columnDefs}
                overlayNoRowsTemplate='There are no books to add, edit, or delete'
                onCellValueChanged={onChangeEdit}
            />
            <Modal
                isOpen={addIsOpen}
                onRequestClose={addRow}
                contentLabel="Add book"
                style={modalStyles}
                ariaHideApp={false}
            >
                <div>
                    <span>ID: </span>
                    <input type="text" onChange={e => setTempModalId(e.target.value)} />
                </div>
                <div>
                    <span>Title: </span>
                    <input type="text" onChange={e => setTempModalTitle(e.target.value)} />
                </div>
                <div>
                    <span>Author: </span>
                    <input type="text" onChange={e => setTempModalAuthor(e.target.value)} />
                </div>
            </Modal>
    
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

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };