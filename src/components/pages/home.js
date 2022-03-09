import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Book from '../book/book';
import AddBook from './add-book';

export default function Home() {
    const [allBooks, setAllBooks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [bookToEdit, setBookToEdit] = useState({});
    const [editMode, setEditMode] = useState(false);

    const getAllBooks = () => {
        axios.get('https://anchorstore-api.herokuapp.com/')
        .then(res => {
            setAllBooks(res.data)
        })
        .catch(error => {
            console.log('An error has occured while fetching your Books.', error);
        });
    } 

    const handleEditClick = (book) => {
        setBookToEdit(book);
        setEditMode(true);
    }
    
    const handleEditSubmit = () => {
        setEditMode(false);
        getAllBooks();
    }

    const handleDeleteClick = (id) => {

        axios.delete(`http://127.0.0.1:5000/book/delete/${id}`)
        .then(res => {
            setAllBooks(allBooks.filter(book => {
                return book.id !== id;
            }))
        })
        .catch(error => {
            console.log('An error has occured while trying to delete your book.', error);
        })
    }

    const renderBooks = () => {
        return allBooks.map(book => {
            return <Book book={book} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick}/>
        })
    }

    useEffect(() => {
        getAllBooks();
        if(Cookies.get('username')) {
            setLoggedIn(true);
        }
    },[]);


    
    return (
        <div className='home-page-container main-body'>
            <div className='username-title'>
                    <h1>Welcome {loggedIn ? Cookies.get('username') : ''}</h1>
                </div>

            <div className='books-container'>
                {editMode ? <AddBook book={bookToEdit} edit={editMode} request={'update'} handleEditSubmit={handleEditSubmit}/> : renderBooks()}
            </div>
        </div>
    )
}