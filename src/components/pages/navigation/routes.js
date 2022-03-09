import React from "react";
import Home from "../home";
import AddBook from "../book/addBook";
import Signup from '../../signUp';
import Login from '../auth/login';


const routes = {
    '/': () => <Home />,
    '/add-book': () => <AddBook request = {'add'}/>,
    '/signUp': () => <Signup />,
    '/login' : () => <Login />,

}

export default routes;