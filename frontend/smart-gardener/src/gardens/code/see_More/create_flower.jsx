import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ADDR } from '../../App';

function CreateFlower(){

    const [name, setName] = useState('');
    const [cookie, setCookie] = useCookies(["user"]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "id":cookie.user.id,
            "pwd" : cookie.user.pwd,
            "id_garden": cookie.user.id_garden,
            "plant_id": -1 /*get_flower method backend*/
        };

        try {
            await axios.post(ADDR + 'garden/add_flower', formData);
            setName("");
            setAdress("");
            const identity = {
                "first_name":cookie.user.first_name,
                "last_name":cookie.user.last_name,
                "pwd" : cookie.user.pwd
            };
    
            try {
                const responseCookie = await axios.post(ADDR + 'user/connect_user', identity);
                setName("");
                setAdress("");
                if (responseCookie.data.status !== "Bad" && responseCookie.data.status !== "Error" ){
                    responseCookie.data.message.first_name = identity.first_name;
                    responseCookie.data.message.last_name = identity.last_name;
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

export default CreateFlower;