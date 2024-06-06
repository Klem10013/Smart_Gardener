import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ADDR } from '../../App';

function CreateGarden(){

    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [cookie, setCookie] = useCookies(["user"]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "name":name,
            "address":adress,
            "ownerId" : cookie.user.id,
            "pwd" : cookie.user.pwd
        };

        try {
            await axios.post(ADDR + 'garden/create_garden', formData);
            setName("");
            setAdress("");
            const identity = {
                first_name:cookie.user.first_name,
                last_name:cookie.user.last_name,
                pwd : cookie.user.pwd
            };
    
            try {
                const responseCookie = await axios.post(ADDR + 'user/connect_user', identity);
                setName("");
                setAdress("");
                if (responseCookie.data.status !== "Bad" && responseCookie.data.status !== "Error" ){
                    responseCookie.data.message.first_name = identity.first_name;
                    responseCookie.data.message.last_name = identity.last_name;
                    console.log(responseCookie.data.message)
                    setCookie("user",responseCookie.data.message);
                    window.location.href = '/gardens';
                } else {
                    console.error("Couldn't update cookies.");
                }
            } catch (error) {
                console.error('Error sending data :', error);
            }

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