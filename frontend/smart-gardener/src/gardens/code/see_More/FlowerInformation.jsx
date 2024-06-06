import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container, Row,ListGroup} from "react-bootstrap";
import axios from "axios";
import {ADDR} from "../../../App";
import "../../styles/seeDetails.css"

function UserInformation() {

    const [member, setMember] = useState([])
    const [cookie, setCookie] = useCookies(["user"]);

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

    }, []);
    return (<>
            <Container>
                <Row style={{border: "2px solid #ccc" , background : "#B7B597"}}>
                    <div key={"title_hours"} className="header">All Members
                    </div>
                    {member.map((mem) => {
                        return (<ListGroup style={{border: "2px solid #ccc"}}>
                            <div className={"container"} style={{position: "relative"}}>
                                <div style={{
                                    paddingTop: 20,
                                    position: "relative",
                                    left: "auto",
                                    textAlign: "left",
                                    fontSize: 13
                                }}>
                                    <p style={{marginBottom: 5}}><b>Member Name : </b> {mem.first_name}</p>
                                    <p style={{marginBottom: 20}}><b>Member Address : </b>{mem.last_name}</p>
                                </div>
                            </div>
                        </ListGroup>)
                    })}
                </Row>
            </Container>
        </>
    )
}

export default UserInformation;