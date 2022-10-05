import React from "react";
import "./home.css";
import useAuth from "../../context/Auth.context";
import {
  Container,
  Grid,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from '@mantine/core';
import { At, PhoneCall, MoodSmile } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

export default function Homerest() {
  const { user, signout /*count*/ } = useAuth();

  const [restaurantemail, setRestaurantemail] = React.useState(user.email);
  const [item, setItem] = React.useState();
  const [price, setPrice] = React.useState();

  const [item1, setItem1] = React.useState();
  const [price1, setPrice1] = React.useState();
  
  const navigate = useNavigate();

  //console.log(user.Name);

  return (
    <div>
      <div className="nav">
        <span>
          <h1>NeeV</h1>
        </span>
        <span className="fields" style={{ width : "12%"}}>
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
        <Container>
          <Grid
            style={{
              marginTop: "20px",
            }}
            grow
            gutter="xl"
          >
            <Grid.Col span={12}>
              <Text size="xl" weight={700}>
                Hello, {user.Name} Restaurent Please add a new Dish!
              </Text>
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                placeholder="Enter dish name. 😀"
                label="Dish"
                description="Please Enter a dish name."
                value={item}
                onChange={(e) => setItem(e.target.value)}
                // error='Please Enter a valid First name.'
                variant="filled"
                radius="lg"
                size="md"
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                placeholder="Enter dish Price. 😀"
                label="Price"
                description="Please Enter a Price."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                // error='Please Enter a valid Last name.'
                variant="filled"
                radius="lg"
                size="md"
                required
                icon={<At size={14} />}
                type="Number"
              />
            </Grid.Col>
              <Button
                leftIcon={<MoodSmile size={24} />}
                fullWidth
                variant="subtle"
                color="grape"
                radius="lg"
                size="md"
                onClick={async () => {
                  if (!restaurantemail) {
                    const error = new Error("email is required");
                    throw error;
                  }

                  if (!item) {
                    const error = new Error("item is required");
                    throw error;
                  }

                  if (!price) {
                    const error = new Error("phone is required");
                    throw error;
                  }

                  axios
                    .post("http://localhost:3003/api/v1/foodlist/add_fooditem", {
                      restaurantemail,
                      item,
                      price
                    })
                    .then(function (response) {
                      showNotification({
                        title: "Dish Added Successfully 😃!",
                      });
                    })
                    .catch(function (e) {
                      showNotification({
                        title: "Error in dish adding!",
                        message: e.message,
                      });
                    });

                  navigate("/homerest");
                }}
              >
                Add This Dish😋!
              </Button>
          </Grid>
        </Container>
      </div>
      <div>
        <Container>
          <Grid
            style={{
              marginTop: "20px",
            }}
            grow
            gutter="xl"
          >
            <Grid.Col span={12}>
              <Text size="xl" weight={700}>
                Wants to remove a Dish!
              </Text>
            </Grid.Col>
            <Grid.Col md={6}>
              <TextInput
                placeholder="Enter dish name. 😀"
                label="Dish"
                description="Please Enter a dish name."
                value={item1}
                onChange={(e) => setItem1(e.target.value)}
                // error='Please Enter a valid First name.'
                variant="filled"
                radius="lg"
                size="md"
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                placeholder="Enter dish Price. 😀"
                label="Price"
                description="Please Enter a Price."
                value={price1}
                onChange={(e) => setPrice1(e.target.value)}
                // error='Please Enter a valid Last name.'
                variant="filled"
                radius="lg"
                size="md"
                required
                icon={<At size={14} />}
                type="Number"
              />
            </Grid.Col>
              <Button
                leftIcon={<MoodSmile size={24} />}
                fullWidth
                variant="subtle"
                color="grape"
                radius="lg"
                size="md"
                onClick={async () => {
                  if (!restaurantemail) {
                    const error = new Error("email is required");
                    throw error;
                  }

                  if (!item1) {
                    const error = new Error("item is required");
                    throw error;
                  }

                  if (!price1) {
                    const error = new Error("phone is required");
                    throw error;
                  }

                  axios
                    .post("http://localhost:3003/api/v1/foodlist/remove_fooditem", {
                      restaurantemail,
                      item: item1,
                      price: price1
                    })
                    .then(function (response) {
                      showNotification({
                        title: "Dish Removed Successfully 😃!",
                      });
                    })
                    .catch(function (e) {
                      showNotification({
                        title: "Error in dish adding!",
                        message: e.message,
                      });
                    });

                  navigate("/homerest");
                }}
              >
                Remove This Dish😋!
              </Button>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
