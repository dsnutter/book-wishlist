import React, { useState } from 'react';
import BookSublist from './bookSublist';
import BookManage from './bookManage';
import { getAllBooks } from '../utility/api';
import { ACTION } from '../utility/constants';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const BookList = () => {

    const [books, setBooks] = useState([]);
    const [action, setAction] = useState(ACTION.NONE);
    const [tabIndex, setTabIndex] = useState(0);

    const refreshBooks = async () => {
        try {
            setBooks(await getAllBooks());    
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
                    <Tab label="Book Sublist" id="tab-0" ariaControls="tabpanel-0" />
                    <Tab label="Manage All Books" id="tab-1" ariaControls="tabpanel-1" />
                    <Tab label="Book SVG Image" id="tab-2" ariaControls="tabpanel-2" />
                </Tabs>
            </AppBar>
            <div id="tabpanel-0" hidden={tabIndex !== 0}>
                <h2>Create Sublist</h2>
                <BookSublist books={books} refreshBooks={refreshBooks} action={action} />
            </div>
            <div id="tabpanel-1" hidden={tabIndex !== 1}>
                <h2>Manage Full List</h2>
                <BookManage books={books} refreshBooks={refreshBooks} setBooks={setBooks} setAction={setAction} />
            </div>
            <div id="tabpanel-2" hidden={tabIndex !== 2}>
                <h2>Book SVG Image</h2>
            </div>
        </>
    );
};

export default BookList;