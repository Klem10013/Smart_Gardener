import React from 'react';
import {Link, useLocation} from "react-router-dom";

import '../styles/body.css';
import image from "../styles/imagehome.jpg"

function Body() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    const handleRegister = (event) => {
        window.location.href = "/connect_user"
    }
    const handleCreate = (event) => {
        window.location.href = "/create_user"
    }
    /*return (
        <>
             <div id="bodyhome-container">
             <Link to="/" id="bodyhome-title">
             <img src="../../data/logo.png" alt="error_loading_logo"/>
             <div id="bodyhome-title-text">Smart Gardener</div>
             <div id="bodyhome-description-text">Smart Gardener, the app that manages your garden with perfection !!!</div>
             </Link>
             <Link to="/create_user" className="navbar-button" id="connect-button">
             <div>
             <img src="./data/profile.png" alt="error_loading_profile_image"/> Register
             </div>
             </Link>
             <Link to="/connect_user" className="navbar-button" id="register-button">
             <div>
             <img src="./data/profile.png" alt="error_loading_profile_image"/> Connect
             </div>
             </Link>
             </div>
             </>
    );*/
    return (
        <div className="container-fluid vh-100 align-items-center justify-content-center">
            <div className="row">
                <div className="col-md-6 left-section d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-4">Smart Gardener</h1>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary mx-2" onClick={handleRegister}>Register</button>
                        <button className="btn btn-primary mx-2"onClick={handleCreate}>Create</button>
                    </div>
                </div>
                <div className="col-md-6 right-section"></div>
            </div>
        </div>
    );
}

export default Body;
