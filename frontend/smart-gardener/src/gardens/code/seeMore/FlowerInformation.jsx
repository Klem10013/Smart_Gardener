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
            setLog(Object.values(data.log.log));
        });
    }, [cookie.id_Garden, cookie.user.id, cookie.user.pwd]);

    const handleSeeInfos = (index) => {
        const vis = [...visibleDetails]
        vis[index] = !vis[index]
        setVisibleDetails(vis);
    };

    const handleDelete = (index) => {
    };

    const handleAddFlower = () => {
        //Cookies ?
        window.location.href = '/addFlowers'
    };

    // Transform temperatures and soils arrays for recharts
    const temperatureData = {}
    const soilData = {}
    for (let i = 0; i < log.length; i++) {
        const fl = log[i]
        temperatureData.i = fl.temperature.map((value, index) => ({
            index,
            value,
        }));
        soilData.i = fl.soil.map((value, index) => ({index, value}));
    }

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
                                                    data={temperatureData.index}
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
                                                    data={soilData.index}
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
