import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { ADDR } from '../../App';
import '../styles/create_user.css';

function CreateUser(){

    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "firstname":firstname,
            "surname":surname
        };

        try {
            await axios.post(ADDR + 'user/create_user', formData);
            setFirstname("");
            setSurname("");
            window.location.href = '/';
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <div className="padding-center-logo">
            <Link to="/" className="title">
                <img src="../../../data/logo.png" alt="error_loading_logo" />
            </Link>
            <form id="register-form" onSubmit={handleSubmit}>
                <div className="register-field">
                    <label htmlFor="firstname" className="register-label">Firstname:</label>
                    <input className='register-input' type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="surname" className="register-label">Address mail:</label>
                    <input className='register-input' type="address" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                </div>
    
                <button id="register-submit" type="submit">Create Account</button>
            </form>
        </div>
    );
    
}

export default CreateUser;