import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

class App extends Component{

    render() {

        return (
            <Router>
                <div>
                    <NavBar />
                    <Route name='home' exact path='/' component={HomePage} />
                    <Route name='login' exact path='/login' component={Login} />
                    <Route name='register' exact path='/register' component={Register} />
                    <Route name='todolists'
                           exact path='/todolists'
                           render={(props) => <TodoList/>} />
                </div>
            </Router>
        )
    }
}

export default App;