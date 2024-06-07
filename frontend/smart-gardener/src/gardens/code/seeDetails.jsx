import {React} from "react";
import UserInformation from "./seeMore/UserInformation";
import FlowerInformations from "./seeMore/FlowerInformation";


function SeeDetails() {
    return (<>
        <div className="left-section d-flex justify-content-center align-items-center">
                <UserInformation/>
                <FlowerInformations/>
        </div>
    </>)
}

export default SeeDetails;