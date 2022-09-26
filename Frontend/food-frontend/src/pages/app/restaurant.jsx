import React, { useState } from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Restcard from "./card.jsx";
import { useNavigate } from 'react-router-dom';

export default function Restaurant() {
  const { user, signout /*count*/ } = useAuth();
  const [restaurant, setRestaurant] = useState([]);
  //console.log(user.Name);

  const navigate = useNavigate();

  axios
    .get("http://localhost:3003/api/v1/get_restaurants")
    .then(function (response) {
      setRestaurant(response.data);
    })
    .catch(function (e) {
      showNotification({
        title: "Error in getting restaurants",
        message: e.message,
      });
    });

  return (
    <div>
      <div className="nav">
        <span>
          <h1>NeeV</h1>
        </span>
        <span className="fields">
          <button className="cartbtn">
            <span>
              <div className="cart"></div>
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
                navigate('/restaurant');
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
      <div>
        {restaurant.map((el, i) => {
          <Restcard rest={el} />;
        })}
      </div>
    </div>
  );
}
