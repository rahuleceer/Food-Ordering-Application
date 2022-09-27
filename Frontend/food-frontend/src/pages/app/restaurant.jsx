import React, { useState } from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Badge, Group } from "@mantine/core";

export default function Restaurant() {
  const { user, signout /*count*/ } = useAuth();
  const [c, setC] = useState(0);
  //console.log(user.Name);
  const [rest, setRest] = useState();
  const navigate = useNavigate();

  const v = async () => {
    if (c == 0) {
      axios
        .post("http://localhost:3003/api/v1/get_restaurants")
        .then(function (response) {
          setRest(response.data.list);
          console.log("1---->", rest);
        })
        .catch(function (e) {
          showNotification({
            title: "Error in getting restaurants",
            message: e.message,
          });
        });
      setC(c + 1);
    }
  };
  v();

  console.log(rest);

  return (
    <div>
      <div className="nav">
        <span>
          <h1>NeeV</h1>
        </span>
        <span className="fields">
          <button className="cartbtn">
            <span>
              <img
                style={{
                  width: "25px",
                  border: "0px",
                  backgroundColor: "darkgoldenrod",
                }}
                src={require("../../resources/cart.jpg")}
                alt=""
              />
            </span>
            <sup style={{ color: "red" }}>3</sup>
          </button>
          <span>
            <button
              style={{
                color: "white",
                backgroundColor: "darkgoldenrod",
                border: "0px",
              }}
              onClick={function (e) {
                navigate("/food_items");
              }}
            >
              Food Items
            </button>
            <button
              style={{
                color: "white",
                backgroundColor: "darkgoldenrod",
                border: "0px",
              }}
              onClick={function (e) {
                navigate("/restaurant");
              }}
            >
              restaurant
            </button>
          </span>
          <span>
            <button
              style={{
                color: "white",
                backgroundColor: "darkgoldenrod",
                border: "0px",
              }}
              onClick={function (e) {
                signout();
              }}
            >
              logout
            </button>
          </span>
          <span>{user.Name}</span>
        </span>
      </div>
      <div style={{ display: "flex" }}>
        {
          //map on rest
          rest?.map((el) => {
            return (
              <div>
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{ margin: "3%" }}
                >
                  <Card.Section>
                    <Image
                      src={require("../../resources/dish.jpg")}
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={700} style={{ color: "green" }}>
                      {el.Name} Restaurant
                    </Text>
                    <Badge color="pink" variant="light">
                      call us : {el.phone}
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    {el.address}
                  </Text>
                </Card>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
