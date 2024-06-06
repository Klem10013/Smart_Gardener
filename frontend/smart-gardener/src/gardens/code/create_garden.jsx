import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { ADDR } from '../../App';
import '../styles/create_user.css';

function CreateUser(){

    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [gardenCookie, setCookie] = useCookies(["moreInfos"]);

    const gardenInfos = {
        "id" : "",
        "pwd" : "",
    };

    const getMoreInfos = async ()=>{
        try {
            await axios.post(ADDR + 'create_garden', formData);
            window.location.href = ADDR;
        } catch (error) {
            console.error('Error sending data :', error);
        }
    }

    getMoreInfos();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "name":name,
            "adress":adress,
            "ownerId" : "",
            "pwd" : ""
        };

        try {
            await axios.post(ADDR + 'create_user', formData);
            setName("");
            setAdress("");
            window.location.href = ADDR;
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <div className="padding-center-logo">
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

export default CreateUser;