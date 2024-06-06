import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container, Row, ListGroup } from "react-bootstrap";
import axios from "axios";
import { ADDR } from "../../../App";
import "../../styles/seeDetails.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function FlowerInformation() {
  const [flower, setFlower] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [soils, setSoils] = useState([]);

  const [cookie] = useCookies(["user"]);
  const [visibleDetails, setVisibleDetails] = useState(false);

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
      setTemperatures(data.log.log[0].temperature);
      setSoils(data.log.log[0].soil);
      console.log("flower : ");
      console.log(flower);
      console.log("response.data.message : ");
      console.log(response.data.message);
      console.log("temperatures : ");
      console.log(temperatures);
      console.log("soils : ");
      console.log(soils);
    });
  }, []);

  const handleSeeInfos = (index) => {
    setVisibleDetails((prevState) => !prevState);
  };

  const handleDelete = (index) => {};

  const handleAddFlower = () => {};

  // Transform temperatures and soils arrays for recharts
  const temperatureData = temperatures.map((value, index) => ({
    index,
    value,
  }));
  const soilData = soils.map((value, index) => ({ index, value }));

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
            flower.map((mem) => {
              return (
                <div
                  className="gardens-container"
                  style={{ paddingTop: 5 }}
                  key={mem}
                >
                  {cookie.user.gardens.map((garden, index) => (
                    <div className="garden-card" key={mem.name}>
                      <div className="title-container">
                        <h2>{mem.name}</h2>
                      </div>

                      <button
                        onClick={() =>
                          handleSeeInfos(cookie.user.gardens[index])
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

                      {visibleDetails && (
                        <div className="flower-graphs">
                          <h5>temperature</h5>
                          <BarChart
                            style={{ transform: "translateX(-40px)" }}
                            width={graphWidth}
                            height={graphHeight}
                            data={temperatureData}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="index" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="red" />
                          </BarChart>

                          <h5>moisture</h5>
                          <BarChart
                            style={{ transform: "translateX(-40px)" }}
                            width={graphWidth}
                            height={graphHeight}
                            data={soilData}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="index" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="blue" />
                          </BarChart>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default FlowerInformation;
