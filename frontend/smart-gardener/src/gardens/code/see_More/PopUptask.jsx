import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {ADDR} from "../../../App";



const PopUpAdd = ({user, onHide}) => {
    const [plant_name, setPlantName] = useState("")
    const handleclick = async(event) => {
        event.preventDefault();
        const v4options = {
            random: [
                0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
            ],
        };
        const formData = {
            id: user.user.id,
            pwd: user.user.pwd,
            id_garden: user.id_Garden,
            plant_id : uuidv4(v4options),
            plant_name : plant_name
        };
        try {
            const response = await axios.post(ADDR + "flower/add_flower", formData).then((resp) => {
                onHide()
                console.log("Haa")
            });

            if (response.status !== "Bad" && response.status !== "Error" ){
                window.location.href = `/seeDetails`;
            }
            window.location.href = `/seeDetails`;
        } catch (error) {
            console.error('Error sending data :', error);
        }
        onHide()
    };
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Plant to the garden</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput"
                           placeholder="Appel" fdprocessedid="9e89nj"
                           value={plant_name} onChange={(event) => setPlantName(event.target.value)}/>
                    <label htmlFor="floatingInput">Plant Name</label>
                </div>
                <button type="submit" className="btn btn-primary" fdprocessedid="nrr97f" onClick={handleclick}>Add Plant</button>

            </Modal.Body>
            {/* Add more product details here */}
            <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopUpAdd