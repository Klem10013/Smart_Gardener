import React from 'react';
import { useCookies } from "react-cookie";

import '../styles/gardens.css';

function Gardens() {

    const [cookie] = useCookies(["user"]);

    const handleSeeDetails = (event) => {
        window.location.href = 'seeDetails'
    };

    const handleDelete = (event) => {
        //Del garden
    };

    return (
        <div>
            <h1>{cookie.user.id}'s gardens</h1>

            <div className="gardens-container">
                {cookie.user.gardens.map((garden, index) => (
                    <div className="garden-card" key={index}>
                        <h2>{garden}</h2>
                        <button onClick={()=>handleSeeDetails()} className="see-details-button">See Details</button>
                        <button onClick={()=>handleDelete()} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>

            <button className="add-button">Add</button>
        </div>
    );
}

export default Gardens;
