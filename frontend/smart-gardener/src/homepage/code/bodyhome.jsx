import React from 'react';
import { Link, useLocation } from "react-router-dom";

import '../styles/body.css';
 
function Body(){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    return (
        <>
            {!userId && (
                <div id="bodyhome-container">
                    <Link to="/" id="bodyhome-title">
                        <img src="../../data/logo.png" alt="error_loading_logo" />
                        <div id="bodyhome-title-text">Smart Gardener</div>
                        <div id="bodyhome-description-text">Smart Gardener, the app that manages your garden with perfection !!!</div>
                    </Link>
                    <Link to="/create_user" className="navbar-button" id="connect-button">
                        <div>
                            <img src="./data/profile.png" alt="error_loading_profile_image" /> Register
                        </div>
                    </Link>
                    <Link to="/connect_user" className="navbar-button" id="register-button">
                        <div>
                            <img src="./data/profile.png" alt="error_loading_profile_image" /> Connect
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
}

export default Body;
