import React, { useState, useRef } from 'react';
import { deleteBook, addBook, editBook } from '../utility/api';
import Grid from '../controls/grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ACTION } from '../utility/constants';

const BookManage = ({ books, setAction, setChangedBook, autoSize }) => {

    const gridApi = useRef();

    const [addIsOpen, setAddIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);

    const [tempModalTitle, setTempModalTitle] = useState('');
    const [tempModalAuthor, setTempModalAuthor] = useState('');
    const [tempModalId, setTempModalId] = useState('');

    const classes = useStyles();

    const deleteRow = () => {
        const nodes = gridApi.current.getSelectedNodes();
        if (nodes.length > 0) {
            const book = nodes[0].data; 
            const id = book.id;
            (async () => {
                const success = await deleteBook(id);
                if (success) {
                    // need to update the book sublist if this deleted book is on it, so set the action to delete
                    setAction(ACTION.DELETE);
                    setChangedBook(book);
                    console.log(ACTION.DELETE, book);
                }
            })();
        }
    };

    const addRow = () => {
        if (tempModalAuthor !== '' && tempModalTitle !== '' && tempModalId !== '') {
            const book = {
                id: tempModalId,
                title: tempModalTitle,
                author: tempModalAuthor
            };
            (async () => {
                const success = await addBook(book);
                if (success) {
                    setAction(ACTION.ADD);
                    setChangedBook(book);
                    console.log(ACTION.ADD, book);
                }
            })();
    
        }
        closeModal();
    };

    const editRow = () => {
        const book = {
            id: tempModalId,
            title: tempModalTitle,
            author: tempModalAuthor
        };
        (async () => {
            const success = await editBook(book.id, book);
            if (success) {
                setAction(ACTION.EDIT);
                setChangedBook(book);
                console.log(ACTION.EDIT, book);
            }
        })();
        closeModal();
    }

    const openModal = (type) => {
        if (type === ACTION.ADD) {
            setTempModalId('');
            setTempModalTitle('');
            setTempModalAuthor('');
            setAddIsOpen(true);
        } else if (type === ACTION.EDIT) {
            const nodes = gridApi.current.getSelectedNodes();
            if (nodes.length > 0) {
                const book = nodes[0].data;
                setTempModalId(book.id);
                setTempModalTitle(book.title);
                setTempModalAuthor(book.author);
                setEditIsOpen(true);
            }
        }
    }

    const closeModal = () => {
        setAddIsOpen(false);
        setEditIsOpen(false);
    }

    return (
        <>
            <Button onClick={deleteRow} color="primary" className={classes.button}>Delete Selected</Button>
            <Button onClick={() => openModal(ACTION.ADD)} color="primary" className={classes.button}>Add</Button>
            <Button onClick={() => openModal(ACTION.EDIT)} color="primary" className={classes.button}>Edit Selected</Button>
            <Grid 
                gridApi={gridApi}
                height='450px'
                width='900px'
                rowData={books}
                columnDefs={columnDefs}
                overlayNoRowsTemplate='There are no books to add, edit, or delete'
                autoSize={autoSize}
            />
            <Dialog
                open={addIsOpen || editIsOpen}
                aria-labelledby="simple-modal-title"
            >
                <DialogTitle id="form-dialog-title">
                        {(addIsOpen ? 'Add' : 'Edit')} a book
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a book to the backend database, enter a new book.
                    </DialogContentText>
                    <TextField 
                        onChange={e => setTempModalId(e.target.value)} 
                        label="Book ID" 
                        margin="dense" 
                        InputProps={{readOnly: editIsOpen }} 
                        value={tempModalId} 
                        fullWidth
                    /><br />
                    <TextField 
                        onChange={e => setTempModalTitle(e.target.value)}  
                        label="Book Title" 
                        margin="dense" 
                        value={tempModalTitle} 
                        fullWidth
                    /><br />
                    <TextField 
                        onChange={e => setTempModalAuthor(e.target.value)} 
                        label="Book Author" 
                        margin="dense" 
                        value={tempModalAuthor} 
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(addIsOpen ? addRow :  editRow)}color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
    
        </>
    );
};

export default BookManage;

const mostColumns = {
    sortable: true
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