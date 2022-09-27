import React, { useState } from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import Restaurant from "./restaurant";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, signout /*count*/ } = useAuth();
  const [restaurant, setRestaurant] = useState();
  //console.log(user.Name);

  const navigate = useNavigate();

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
    </div>
  );
}
