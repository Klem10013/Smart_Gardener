import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container, Row,ListGroup} from "react-bootstrap";
import axios from "axios";
import {ADDR} from "../../../App";
import "../../styles/seeDetails.css"

function FlowerInformation() {

    const [flower, setFlower] = useState([])
    const [cookie, ] = useCookies(["user"]);

    useEffect(() => {
        const formData = {
            "id": cookie.user.id,
            "pwd": cookie.user.pwd,
            "id_garden": cookie.id_Garden
        };
        axios.post(ADDR + 'garden/get_data_garden', formData).then((response) => {
            const data = response.data.message
            const flower = data.flower
            setFlower(flower)
        });

    }, []);

    const handleSeeInfos = () => {
        
    };

    const handleDelete = (index) => {

    };

    const handleAddFlower = () => {
        
    };

    return (<>
            <Container>
                <Row>
                </Row>
            </Container>
        </>
    )
}

export default FlowerInformation;