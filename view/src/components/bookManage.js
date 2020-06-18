import React, { useEffect, useState, useRef } from 'react';
import { getAllBooks } from '../utility/api';
import Grid from '../controls/grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const BookManage = () => {

    const gridApi = useRef();

    const [books, setBooks] = useState([]);
    const [addIsOpen, setAddIsOpen] = useState(false);

    const [tempModalTitle, setTempModalTitle] = useState('');
    const [tempModalAuthor, setTempModalAuthor] = useState('');
    const [tempModalId, setTempModalId] = useState('');

    const classes = useStyles();

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
        if (tempModalAuthor !== '' && tempModalTitle !== '' && tempModalId !== '') {
            setBooks(old => [ ...old, { id: tempModalId, title: tempModalTitle, author: tempModalAuthor } ]);
            gridApi.current.setRowData(books)        
        }
        console.log("ADD");
        closeOpenAddModal();
    };

    const openAddModal = () => {
        setAddIsOpen(true);
    }

    const closeOpenAddModal = () => {
        setAddIsOpen(false);
    }

    return (
        <>
            <Button onClick={deleteRow} color="primary" className={classes.button}>Delete</Button>
            <Button onClick={openAddModal} color="primary" className={classes.button}>Add</Button>
            <Grid 
                gridApi={gridApi}
                height='450px'
                width='900px'
                rowData={books}
                columnDefs={columnDefs}
                overlayNoRowsTemplate='There are no books to add, edit, or delete'
                onCellValueChanged={onChangeEdit}
            />
            <Dialog
                open={addIsOpen}
                onClose={addRow}
                aria-labelledby="simple-modal-title"
            >
                <DialogTitle id="form-dialog-title">
                        Add a book:
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a book to the backend database, enter a new book.
                    </DialogContentText>
                    <TextField onChange={e => setTempModalId(e.target.value)} label="Book ID" margin="dense" /><br />
                    <TextField onChange={e => setTempModalTitle(e.target.value)}  label="Book Title" margin="dense" /><br />
                    <TextField onChange={e => setTempModalAuthor(e.target.value)} label="Book Author" margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeOpenAddModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addRow} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
    
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

const useStyles = makeStyles({
    button: {
        marginLeft: '5px',
        marginBottom: '5px',
    },  
  });