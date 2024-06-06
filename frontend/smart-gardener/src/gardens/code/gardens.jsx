import { React, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";

import '../styles/gardens.css';

function Gardens(){

    const [cookie] = useCookies(["user"]);
    //faudra faire des boutons

    return (
        <div>
            <h1>{cookie.user.member[0].first_name}'s gardens</h1>

            <div className="gardens-container">
                {cookie.user.map((garden, index) => (
                    <div className="garden-card">
                        <h2>{garden.name}</h2>
                        <button >See Details</button>
                        <button >Delete</button>
                    </div>
                ))}
            </div>

            <button>Add</button>
        </div>
    );
       
}

export default Gardens;