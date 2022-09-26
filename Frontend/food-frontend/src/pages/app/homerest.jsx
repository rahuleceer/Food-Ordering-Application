import React from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";

export default function Homerest() {
  const { user, signout /*count*/ } = useAuth();

  //console.log(user.Name);

  return (
    <div>
      <div className="nav">
        <span>
          <h1>NeeV</h1>
        </span>
        <span className="fields">
          <button className="cartbtn">
            <span><div className="cart"></div></span>
            <sup style={{ color: "red" }}>3</sup>
          </button>
          <span>
            <button
              style={{ color: "white", backgroundColor: "darkgoldenrod", border: "0px" }}
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
