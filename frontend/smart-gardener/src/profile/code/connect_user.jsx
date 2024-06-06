import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { ADDR } from '../../App';
import '../styles/connect_user.css';

function ConnectUser(){

    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [, setCookie] = useCookies(["user"]);

    useEffect(() => {
        const timeout = setTimeout(() => {
        setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [errorMessage]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "first_name":firstname,
            "last_name":surname,
            "pwd":password
        };

        try {
            const response = await axios.post(ADDR + 'user/connect_user', formData);
            setFirstname("");
            setSurname("");
            setPassword("");
            if (response.status !== "Bad" && response.status !== "Error" ){
                setCookie("user",response.data.message);
                window.location.href = `/gardens`;
            } else {
                setErrorMessage("Names and password doesn't match.");
            }
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    /*return (
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
    );*/
    return (
        <div className="container-fluid vh-100 align-items-center justify-content-center">
            <div className="row ">
                <div className="col-md-6 left-section d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-4">Smart Gardener</h1>
                    <form className="w-75">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput"
                                   placeholder="name" fdprocessedid="9e89nj"/>
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput"
                                   placeholder="name@example.com" fdprocessedid="9e89nj"/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingInput"
                                   placeholder="name@example.com" fdprocessedid="9e89nj"/>
                            <label htmlFor="floatingInput">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
                <div className="col-md-6 right-section"></div>
            </div>
        </div>
    );
       
}

export default ConnectUser;