import React, {useEffect} from "react";
import {Container, Row, Col,} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import UserInformation from "./see_More/UserInformation";



function SeeDetails()
{
    return(<>
        <Container>
            <Row>
                <Col style={{border: "2px solid #ccc", borderRight: 0}}>
                </Col>
                <Col style={{border: "2px solid #ccc", borderLeft: 0}}>
                    <div>
                        <UserInformation/>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default SeeDetails;