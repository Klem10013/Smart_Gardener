import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";

import '../styles/gardens.css';
import axios from "axios";
import {ADDR} from "../../App";

function Gardens() {

    const [cookie, setCookie] = useCookies(["user"]);
    const [all_garden, set_garden] = useState([])
    console.log(cookie.user.gardens);

    const handleSeeDetails = (event) => {
        setCookie("id_Garden", event);
        window.location.href = '/seeDetails';
    };

    async function haa() {
        const gar = []
        for (let i = 0; i < cookie.user.gardens.length; i++) {
            const garden = cookie.user.gardens[i]
            const formData = {
                "id": cookie.user.id,
                "pwd": cookie.user.pwd,
                "id_garden": garden
            };
            await axios.post(ADDR + 'garden/get_data_garden', formData).then((response) => {
                gar.push(response.data.message)
                set_garden(gar)
            }).catch(
                console.log("Here")
            )
        }

    }


    useEffect(() => {
        haa()
    }, []);


    const handleDelete = (index) => {
        let newGardensList = cookie.user.gardens;
        const fromData =
            {
                id : cookie.user.id,
                pwd : cookie.user.pwd,
                id_garden: newGardensList[index]
            }
        axios.post(ADDR + 'garden/delete_garden', fromData).then((response) =>
        {
            console.log(response.data)
        })

        newGardensList.splice(index, 1);
        cookie.user.gardens = newGardensList;
        setCookie("user", cookie.user);

    };

    const handleAddGarden = () => {
        window.location.href = '/create_garden';
    };

    return (
        <div>
            <div className="left-section d-flex justify-content-center align-items-center">
                <div>
                    <h1>{cookie.user.first_name}'s gardens</h1>

                    <div className="gardens-container">
                        {cookie.user.gardens.map((garden, index) => (
                            <div className="garden-card" key={cookie.user.gardens[index]}>
                                {all_garden.find((gar) => (gar.id === cookie.user.gardens[index])) !== undefined &&
                                    <h2>{all_garden.find((gar) => (gar.id === cookie.user.gardens[index])).name}</h2>
                                }
                                <button onClick={() => handleSeeDetails(cookie.user.gardens[index])}
                                        className="see-details-button">See Details
                                </button>
                                <button onClick={() => handleDelete(index)} className="delete-button">Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => handleAddGarden()} className="add-button">Add</button>
                </div>
            </div>
        </div>
    );
}

export default Gardens;
