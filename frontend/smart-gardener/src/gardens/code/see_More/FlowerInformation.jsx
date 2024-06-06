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
                <Row style={{border: "2px solid #ccc" , background : "#B7B597"}}>
                    <div key={"title_hours"} className="header">All Flowers
                    </div>
                    {flower.map((mem, index) => {
                        return (<ListGroup style={{border: "2px solid #ccc"}}>
                            <div className={"container"} style={{position: "relative"}}>
                                <div style={{
                                    paddingTop: 20,
                                    position: "relative",
                                    left: "auto",
                                    textAlign: "left",
                                    fontSize: 13
                                    }}>
                                    <p style={{marginBottom: 5}}><b>Flower Name : </b> {mem.first_name}</p>
                                    <p style={{marginBottom: 20}}><b>Flower Temp : </b>{mem.last_name}</p>
                                    <button onClick={()=>handleSeeInfos(/*voir c'est quelle fleur*/)} className="see-details-button">See Details</button>
                                    <button onClick={()=>handleDelete(index)} className="delete-button">Delete</button>
                                </div>
                            </div>
                        </ListGroup>)
                    })}
                    <button onClick={()=>handleAddFlower()} className="add-button">Add</button>
                </Row>
            </Container>
        </>
    )
}

export default FlowerInformation;