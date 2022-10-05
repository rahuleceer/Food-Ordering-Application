import React from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { user, signout, orderlist, setOrderlist } = useAuth();
  let total = 0;

  for (let i = 0; i < orderlist.length; i++) {
    total += orderlist[i].quantity * orderlist[i].price;
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className="nav">
        <span>
          <h1>NeeV</h1>
        </span>
        <span className="fields">
          <button
            className="cartbtn"
            onClick={(e) => {
              navigate("/cart");
            }}
          >
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
            <sup style={{ color: "red" }}>
              {orderlist.length > 0 ? orderlist.length : ""}
            </sup>
          </button>
          <span>
            <button
              style={{
                color: "white",
                backgroundColor: "darkgoldenrod",
                border: "0px",
              }}
              onClick={function (e) {
                navigate("/dishes");
              }}
            >
              dishes
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
      <div>
        {
          //map on rest
          orderlist?.map((el) => {
            return (
              <div
                style={{
                  marginBottom: "4%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <span>{el.item}</span>
                <span>{el.quantity}</span>
                <span>{el.price}/dish</span>
                <button
                  style={{
                    backgroundColor: "darkgoldenrod",
                    color: "white",
                    padding: "4px",
                    borderRadius: "8px",
                  }}
                  onClick={(e) => {
                      const arr= orderlist;
                      for (let i=0; i<arr.length; i++) {
                        if(arr[i]==el){
                          arr.splice(i, 1);
                        }
                      }
                      setOrderlist(arr);
                      navigate("/cart");
                  }}
                >
                  remove this item
                </button>
              </div>
            );
          })
        }
      </div>
      <div>total : {total}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            margin: "auto",
            backgroundColor: "green",
            color: "white",
            padding: "4px",
            borderRadius: "8px",
          }}
          onClick={(e) => {
            orderlist?.map((el) => {
              const email = user.email;
              const item = el.item;
              const quantity = el.quantity;
              const price = el.price;
              axios
                .post("http://localhost:3003/api/v1/order/order_completed", {
                  email,
                  item,
                  quantity,
                  price,
                })
                .catch(function (e) {
                  showNotification({
                    title: "Error in getting restaurants",
                    message: e.message,
                  });
                });
            });
            setOrderlist([]);
            navigate("/");
          }}
        >
          Order Items
        </button>
      </div>
    </div>
  );
}
