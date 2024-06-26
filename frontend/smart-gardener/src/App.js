import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateUser from './profile/code/create_user';
import ConnectUser from "./profile/code/connect_user";
import Gardens from "./gardens/code/gardens";
import CreateGarden from "./gardens/code/create_garden";
import Body from "./homepage/code/bodyhome";
import SeeDetails from "./gardens/code/seeDetails";
import AddFlowers from "./gardens/code/seeMore/addFlowers"

import './bootstrap.min.css';
import SimpleNavbar from "./NavBar";
import AddUser from "./gardens/code/seeMore/addUser";

export const ADDR = 'http://localhost:3001/';

function App() {
  return(<div  className="App" id="app" style={{
          margin: 0,
          padding: 0,
      border: 0,
      }}>
      <SimpleNavbar/>
        <Router>
            <Routes>
                <Route path="/" element={<Body/>} />
                <Route path="/create_user" element={<CreateUser/>} />
                <Route path="/connect_user" element={<ConnectUser/>} />
                <Route path="/seeDetails" element={<SeeDetails/>}/>
                <Route path="/gardens" element={<Gardens/>} />
                <Route path="/create_garden" element={<CreateGarden/>} />
                <Route path="/addFlowers" element={<AddFlowers/>} />
                <Route path="/addUser" element={<AddUser/>} />
            </Routes>
        </Router>  
    </div>)


}

export default App;
