import { React } from "react";
import {Container, Row, Col,} from 'react-bootstrap';
import UserInformation from "./see_More/UserInformation";
import FlowerInformations from "./see_More/FlowerInformation";


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
                        <FlowerInformations/>
                    </div>
                </Col>
            </Row>
        </Container>
    </>)
}

export default SeeDetails;