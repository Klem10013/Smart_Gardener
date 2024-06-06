import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateUser from './profile/code/create_user';
import ConnectUser from "./profile/code/connect_user";

import Body from "./homepage/code/bodyhome";

import './App.css';

export const ADDR = 'http://localhost:3000/';

function App() {
  return(<div id="app">
        <Router>
            <Routes>
                <Route path="/" element={<Body/>} />
                <Route path="/create_user" element={<CreateUser/>} />
                <Route path="/connect_user" element={<ConnectUser/>} />
                
                <Route path="/gardens" element={<Gardens/>} />
            </Routes>
        </Router>  
    </div>)
}

export default App;
