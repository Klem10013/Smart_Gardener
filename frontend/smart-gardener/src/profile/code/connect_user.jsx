import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookie } from "react-cookie";

import { ADDR } from '../../App';
import '../styles/connect_user.css';

function ConnectUser(){

    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cookie, setCookie, removeCookie] = useCookie["user"];

    useEffect(() => {
        const timeout = setTimeout(() => {
        setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [errorMessage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "firstname":firstname,
            "surname":surname,
            "password":password
        };

        try {
            const response = await axios.post(ADDR + 'connect_user', formData);
            setFirstname("");
            setSurname("");
            setPassword("");
            if (response.data.status !== "Bad" || response.data.status !== "Error" ){
                setCookie(response.data.message);
                window.location.href = `/gardens`;
            } else {
                setErrorMessage("Names and password doesn't match.");
            }
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <div className="padding-center-logo">
            <Link to="/">
                <img src="../../../data/logo.png" alt="error_loading_logo" />
            </Link>
            <form id="connect-form" onSubmit={handleSubmit}>
                <div className="register-field">
                    <label htmlFor="firstname" className="register-label">Firstname:</label>
                    <input className='register-input' type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="surname" className="register-label">Surname:</label>
                    <input className='register-input' type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                </div>
    
                <div className="connect-field">
                    <label className="connect-label" htmlFor="password">Password:</label>
                    <input className="connect-input" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
    
                <button id="connect-submit" type="submit">Connect</button>
            </form>
            {errorMessage && (<p id='connect-errorMessage'>{errorMessage}</p>)}
        </div>
    );
       
}

export default ConnectUser;