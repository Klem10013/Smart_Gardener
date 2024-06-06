import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container,Row} from "react-bootstrap";
import axios from "axios";
import {ADDR} from "../../../App";

function UserInformation() {

    const [garden,setGarden] = useState([])
    const [cookie, setCookie] = useCookies(["user"]);

    useEffect(() => {
        console.log(cookie.id_Garden)
        const formData = {
            "id":cookie.user.id,
            "pwd":cookie.user.pwd,
            "id_garden" : cookie.id_Garden
        };
        axios.post(ADDR + 'garden/get_data_garden', formData).then((response) =>
        {
            const data = response.data.message
            const flower = data.flower_id
            console.log(data)
            console.log(flower)
            setGarden(data)
            console.log(garden.message.flower_id)
        });

    }, []);
    return (<>
        <Container>
            <Row style={{border : "2px solid #ccc"}}>
                <div key={"title_hours"} className="header" >User information</div>
                <div className={"container"} style={{position: "relative"}}>
                    <div style={{paddingTop: 20, position: "relative", left: "auto", textAlign: "left", fontSize:13}}>
                        <p style={{marginBottom: 5}}><b>User Name :</b> {garden}</p>
                        <p style={{marginBottom: 20}}><b>User Company :</b> {}</p>
                    </div>
                </div>
            </Row>
        </Container>
    </>)
}

export default UserInformation;