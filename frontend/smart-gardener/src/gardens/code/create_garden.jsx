import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ADDR } from '../../App';
import '../styles/create_user.css';

function CreateGarden(){

    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [cookie] = useCookies(["user"]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "name":name,
            "adress":adress,
            "ownerId" : cookie.user.id,
            "pwd" : cookie.user.pwd
        };

        try {
            await axios.post(ADDR + 'create_garden', formData);
            setName("");
            setAdress("");
            window.location.href = ADDR + 'gardens';
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <div className="padding-center-logo">
            <Link to="/gardens" className="title">
                <img src="../../../data/logo.png" alt="error_loading_logo" />
            </Link>
            <form id="register-form" onSubmit={handleSubmit}>
                <div className="register-field">
                    <label htmlFor="name" className="register-label">Name:</label>
                    <input className='register-input' type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="adress" className="register-label">Adress:</label>
                    <input className='register-input' type="text" value={adress} onChange={(event) => setAdress(event.target.value)}/>
                </div>
    
                <button id="register-submit" type="submit">Create Account</button>
            </form>
        </div>
    );
    
}

export default CreateGarden;