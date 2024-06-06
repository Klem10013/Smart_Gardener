import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container, Row} from "react-bootstrap";
import axios from "axios";
import {ADDR} from "../../../App";
import "../../styles/seeDetails.css"

function UserInformation() {

    const [member, setMember] = useState([])
    const [cookie, ] = useCookies(["user"]);

    useEffect(() => {
        console.log(cookie.id_Garden)
        const formData = {
            "id": cookie.user.id,
            "pwd": cookie.user.pwd,
            "id_garden": cookie.id_Garden
        };
        axios.post(ADDR + 'garden/get_data_garden', formData).then((response) => {
            const data = response.data.message
            const member = data.member
            setMember(member)
            console.log(data)
            console.log(member)
        });

    }, [cookie.id_Garden, cookie.user.id, cookie.user.pwd]);
    return (<>
            <Container>
                <Row>
                    <div key={"title_hours"} className="header">All Members
                    </div>
                    {member.map((mem) => {
                        return (<div className="gardens-container" style={{paddingTop: 5}}>
                            {cookie.user.gardens.map((garden, index) => (

                                <div className="garden-card" key={mem.last_name}>
                                    <div className="title-container">
                                        <h2>{mem.last_name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>)
                    })}
                </Row>
            </Container>
        </>
    )
}

export default UserInformation;