import React, { useState, useRef, useEffect } from 'react';
import BookSublist from './bookSublist';
import BookManage from './bookManage';
import BookImage from './bookImage';
import { getAllBooks } from '../utility/api';
import { ACTION } from '../utility/constants';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const BookList = () => {

    const updateSublist = useRef();

    const [books, setBooks] = useState([]);
    const [action, setAction] = useState(ACTION.NONE);
    const [tabIndex, setTabIndex] = useState(0);
    const [changedBook, setChangedBook] = useState({});

    useEffect(() => {
        refreshBooks();
    }, []);

    useEffect(() => {
        switch (action) {
            case ACTION.EDIT:
                // if in books and is in cart, replace the values in cart
                updateSublist.current((old) =>
                    old.map(obj => {
                        if (changedBook.id === obj.id) {
                            return changedBook;
                        }
                        return obj;
                    })
                );
                refreshBooks();
                break;
            case ACTION.DELETE:
                // only want items in cart, that are in books
                updateSublist.current(old => old.filter(obj => obj.id !== changedBook.id));
                refreshBooks();
                break;
            case ACTION.ADD:
                refreshBooks();
                break;
            default:
                break;
        }
    }, [action, changedBook]);

    async function refreshBooks() {
        try {
            const newBooks = await getAllBooks();
            setBooks(newBooks);    
        } catch (e) {
            console.error("Failed to get all books:", e);
        }
    }

    const handleChange = (event, newValue) => {
      setTabIndex(newValue);
    };

    return (
        <>
            <AppBar position="static">
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab label="Book Sublist" id="tab-0" />
                    <Tab label="Manage All Books" id="tab-1" />
                    <Tab label="Book SVG Image" id="tab-2" />
                </Tabs>
            </AppBar>
            <div id="tabpanel-0" hidden={tabIndex !== 0}>
                <h2>Create Book Sublist</h2>
                <BookSublist 
                    books={books} 
                    updateSublist={updateSublist} 
                    autoSize={tabIndex === 0} 
                />
            </div>
            <div id="tabpanel-1" hidden={tabIndex !== 1}>
                <h2>Manage Full Book List</h2>
                <BookManage 
                    books={books} 
                    setBooks={setBooks} 
                    setAction={setAction} 
                    setChangedBook={setChangedBook} 
                    autoSize={tabIndex === 1} 
                />
            </div>
            <div id="tabpanel-2" hidden={tabIndex !== 2}>
                <h2>Book Cover</h2>
                <BookImage books={books} />
            </div>
        </>
    );
};

export default BookList;
