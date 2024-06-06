import {React} from "react";
import {Container, Row, Col,} from 'react-bootstrap';
import UserInformation from "./see_More/UserInformation";
import FlowerInformations from "./see_More/FlowerInformation";


function SeeDetails() {
    return (<>
        <div className="left-section d-flex justify-content-center align-items-center">
            <UserInformation/>
            <FlowerInformations/>
        </div>
    </>)
}

export default SeeDetails;