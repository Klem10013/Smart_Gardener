import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { ADDR } from '../../App';
import '../styles/gardens.css';

function ConnectUser(){

        try {
            const response = await axios.get(ADDR + 'get_data_garden', formData);

            
            if (response.data.status !== "Bad" || response.data.status !== "Error" ){
                
            } else {
                setErrorMessage("An error occured.");
            }
        } catch (error) {
            console.error('Error sending data :', error);
        }

    return (<>
    </>
    );
       
}

export default Gardens;