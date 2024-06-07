import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {Container, Row } from "react-bootstrap";
import axios from "axios";
import {ADDR} from "../../../App";
import "../../styles/seeDetails.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function FlowerInformation() {
    const [flower, setFlower] = useState([]);
    const [log, setLog] = useState({});

    const [cookie] = useCookies(["user"]);
    const [visibleDetails, setVisibleDetails] = useState([]);
    const [temperatureData, setTemperatureData] = useState([])
    const [soilData, setSoilData] = useState([])

    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const formData = {
            id: cookie.user.id,
            pwd: cookie.user.pwd,
            id_garden: cookie.id_Garden,
        };
        axios.post(ADDR + "garden/get_data_garden", formData).then((response) => {
            const data = response.data.message;
            const flower = data.flower_id;
            setFlower(flower);
            const visibility = []
            for (let i = 0; i < flower.length; i++) {
                visibility.push(false)
            }
            setVisibleDetails(visibility)
            setLog(data.log.log);
            console.log("Log = ",data.log.log.length)
            console.log("flower : ", flower);
            console.log("response.data.message : ", response.data.message);


            // Transform temperatures and soils arrays for recharts
            const tD = []
            const sD = []

            for (let i = 0; i < data.log.log.length; i++) {
                const fl = data.log.log[i]
                while (fl.temperature.length<10)
                {
                    fl.temperature.push(0)
                }
                tD.push(fl.temperature.map((value, index) => ({
                    index,
                    value,
                })))
                while (fl.soil.length<10)
                {
                    fl.soil.push(0)
                }
                sD.push(fl.soil.map((value, index) => ({index, value})));
            }
            setTemperatureData(tD)
            setSoilData(sD)

        });
    }, []);

    const handleSeeInfos = (index) => {
        const vis = [...visibleDetails]
        vis[index] = !vis[index]
        setVisibleDetails(vis);
    };

    const handleDelete = (index) => {
        const formData = {
            id: cookie.user.id,
            pwd: cookie.user.pwd,
            id_garden: cookie.id_Garden,
            plant_id : log[index].id
        };
        axios.post(ADDR + "flower/delete_flower", formData).then((response) => {})
        window.location.href = '/seeDetails';
    };

    const handleAddFlower = () => {
        //Cookies ?
        window.location.href = '/addFlowers'
    };


    const graphWidth = 200;
    const graphHeight = 150;

    return (
        <>
            <Container>
                <Row>
                    <div key={"title_hours"} className="header">
                        Flowers
                    </div>
                    {flower &&
                        flower.map((mem, index) => {
                            return (
                                <div className="gardens-container" style={{paddingTop: 5}} key={mem.name + "1223"}>
                                    <div className="garden-card" key={mem.name}>
                                        <div className="title-container">
                                            <h2>{mem.name}</h2>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleSeeInfos(index)
                                            }
                                            className="see-details-button"
                                        >
                                            {visibleDetails ? "Hide Details" : "See Details"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>

                                        {visibleDetails[index] && (
                                            <div className="flower-graphs">
                                                <h5>temperature</h5>
                                                <BarChart
                                                    style={{transform: "translateX(-40px)"}}
                                                    width={graphWidth}
                                                    height={graphHeight}
                                                    data={temperatureData[index]}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3"/>
                                                    <XAxis dataKey="index"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <Bar dataKey="value" fill="red"/>
                                                </BarChart>

                                                <h5>moisture</h5>
                                                <BarChart
                                                    style={{transform: "translateX(-40px)"}}
                                                    width={graphWidth}
                                                    height={graphHeight}
                                                    data={soilData[index]}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3"/>
                                                    <XAxis dataKey="index"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <Bar dataKey="value" fill="blue"/>
                                                </BarChart>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                            );
                        })}
                </Row>
                <button onClick={() => handleAddFlower()} className="add-button">Add</button>
            </Container>
        </>
    );
}

export default FlowerInformation;
