import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Container, Row } from "react-bootstrap";
import { ADDR } from "../../../App";
import "../../styles/seeDetails.css";

function UserInformation() {
  const [member, setMember] = useState([]);
  const [cookie] = useCookies(["user"]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const formData = {
      id: cookie.user.id,
      pwd: cookie.user.pwd,
      id_garden: cookie.id_Garden,
    };
    fetch(ADDR + "garden/get_data_garden", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      r.json().then((d) => {
        const data = d.message;
        setMember(data.member);
        setToken(data.token);
      });
    });
  }, [cookie.id_Garden, cookie.user.id, cookie.user.pwd]);
  const handleAddUser = () => {
    //Cookies ?
    window.location.href = "/addUser";
  };

  return (
    <>
      <Container>
        <div className="header">
          <h1>Garden info</h1>

          <h5>--</h5>
          <h5>garden token : {token}</h5>
          <h5>garden id : {cookie.id_Garden}</h5>

          <h5>--</h5>
        </div>

        <Row>
          <div key={"title_hours"} className="header">
            <h1>All Members</h1>
            <h5>--</h5>
          </div>
          {member.map((mem) => {
            return (
              <div
                className="gardens-container"
                style={{ paddingTop: 5 }}
                key={mem.last_name}
              >
                <div key={mem.last_name + "Card"}>
                  <div>
                    <h5>Address : {mem.last_name}</h5>
                    <h5>Name : {mem.first_name}</h5>
                    <h5>Id : {mem.id}</h5>
                    <h5>--</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </Row>
        <button onClick={() => handleAddUser()} className="add-button">
          Add
        </button>
      </Container>
    </>
  );
}

export default UserInformation;
