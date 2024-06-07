import React, {useState} from 'react';
import axios from 'axios';
import {useCookies} from "react-cookie";
import { Link } from "react-router-dom";

import { ADDR } from '../../../App';

function AddFlowers(){

    const [name, setName] = useState('');
    const [cookie] = useCookies(["user"]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            id:cookie.user.id,
            pwd:cookie.user.pwd,
            plant_id : 123,
            plant_name : name,
            id_garden:cookie.id_Garden

        };

        console.log(formData);

        try {
            const response = await axios.post(ADDR + 'flower/add_flower', formData);
            console.log(response.data);
            setName("");
            window.location.href = '/seeDetails';

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
    
                <button id="register-submit" type="submit">Add New Flower</button>
            </form>
        </div>
    );
    
}

export default AddFlowers;