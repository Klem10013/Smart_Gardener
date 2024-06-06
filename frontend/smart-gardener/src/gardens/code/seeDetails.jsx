import React, {useEffect} from "react";
import {Container, Row, Col,} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import UserInformation from "./see_More/UserInformation";



function SeeDetails()
{
    return(<>
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                    <div>
                        <UserInformation/>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default SeeDetails;