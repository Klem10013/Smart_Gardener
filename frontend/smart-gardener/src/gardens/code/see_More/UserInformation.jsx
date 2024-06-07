import React, {useEffect, useState, useCallback} from "react";
import {useCookies} from "react-cookie";
import {Container, Row} from "react-bootstrap";
import axios from "axios";
import {ADDR} from "../../../App";
import "../../styles/seeDetails.css";

function UserInformation() {
    const [member, setMember] = useState([]);
    const [cookie,] = useCookies(["user"]);



    useEffect(() => {
        //Come();
        const formData = {
            id: cookie.user.id,
            pwd: cookie.user.pwd,
            id_garden: cookie.id_Garden
        };
        fetch(ADDR + 'garden/get_data_garden', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
        }).then(r => {
            r.json().then((d) => {
                const data = d.message
                setMember(data.member);
            })
        })
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <div key={"title_hours"} className="header">
                        All Members
                    </div>
                    {member.map((mem) => {
                        return (

                            <div
                                className="gardens-container"
                                style={{paddingTop: 5}}
                                key={mem.last_name}
                            >
                                <div className="garden-card" key={mem.last_name+"Card"}>
                                    <div className="title-container">
                                        <h2>{mem.last_name}</h2>
                                    </div>
                                </div>

                            </div>)
                    })}
                </Row>
            </Container>
        </>
    )
        ;
}

export default UserInformation;