import React from 'react';
import { useCookies } from "react-cookie";

import '../styles/gardens.css';

function Gardens() {

    const [cookie,setCookie] = useCookies(["user"]);
    console.log(cookie.user.gardens);

    const handleSeeDetails = (event) =>{
        setCookie("id_Garden",event)
        window.location.href = '/seeDetails'
    };

    const handleDelete = (index) => {
        let newGardensList = cookie.user.gardens;
        newGardensList.splice(index,1);
        cookie.user.gardens = newGardensList;
        setCookie("user",cookie);
    };

    const handleAddGarden = () => {
        window.location.href = '/create_garden';
    };

    return (
        <div>
            <h1>{cookie.user.id}'s gardens</h1>

            <div className="gardens-container">
                {cookie.user.gardens.map((garden, index) => (
                    <div className="garden-card" key={cookie.user.gardens[index]}>
                        <h2>{garden}</h2>
                        <button onClick={()=>handleSeeDetails(cookie.user.gardens[index])} className="see-details-button">See Details</button>
                        <button onClick={()=>handleDelete(index)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>

            <button onClick={()=>handleAddGarden()} className="add-button">Add</button>
        </div>
    );
}

export default Gardens;
