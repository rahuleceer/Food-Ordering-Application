import React, { useState } from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Button, Badge, Group } from "@mantine/core";

export default function Fooditems() {
  const { user, signout, orderlist, setOrderlist } = useAuth();
  const [foodlist, setFoodlist] = useState();
  const [c, setC] = useState(0);

  const v = async () => {
    if (c == 0) {
      axios
        .post("http://localhost:3003/api/v1/foodlist/get_fooditems")
        .then(function (response) {
          setFoodlist(response.data.list);
          console.log("1---->", foodlist);
        })
        .catch(function (e) {
          showNotification({
            title: "Error in getting dishes",
            message: e.message,
          });
        });
      setC(c + 1);
    }
  };
  v();

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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {
          //map on rest
          foodlist?.map((el) => {
            return (
              <div style={{ width: "300px", height: "300px" }}>
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{ margin: "3%" }}
                >
                  <Card.Section>
                    <Image
                      src={require("../../resources/item.jpg")}
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={700} style={{ color: "green" }}>
                      {el.item}
                    </Text>
                    <Badge color="pink" variant="light">
                      price : {el.price}
                    </Badge>
                  </Group>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={function (e) {
                        const arr = orderlist;
                        let f = 0;
                        for (let i = 0; i < arr.length; i++) {
                          if (el == arr[i]) {
                            f = 1;
                            arr[i].quantity += 1;
                            break;
                          }
                        }
                        if (f == 0) {
                          const v = el;
                          v.quantity = 1;
                          arr.push(v);
                        }
                        setOrderlist(arr);
                        console.log(orderlist);
                        localStorage.setItem("Cart", JSON.stringify(orderlist));
                      }}
                      style={{ textAlign: "center" }}
                    >
                      Add to cart
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
