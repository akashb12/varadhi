import React from 'react';
import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";
import HomePage from './component/views/HomePage/HomePage'
import LoginPage from './component/views/LoginPage/LoginPage'
import AllUsers from './component/views/AllUsers/AllUsers'
import AllBlogs from './component/views/AllBlogs/AllBlogs'
import DetailBlogPage from './component/views/DetailBlogPage/DetailBlogPage'
import NavBar from './component/views/NavBar/NavBar'

function App() {
  return (
    <div style={{height:'100%'}}>
       <Router>
       <NavBar />
       <Switch>
        <Route exact path="/home" component={(HomePage)} />
        <Route exact path="/login" component={(LoginPage)} />
        <Route exact path="/users" component={(AllUsers)} />
        <Route exact path="/blogs" component={(AllBlogs)} />
        <Route exact path="/blogs/:id" component={(DetailBlogPage)} />
        </Switch>
       </Router>
    </div>
  );
}

export default App;
