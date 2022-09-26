import React from "react";
import "./signbg.css";
import {
  Container,
  Grid,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from "@mantine/core";
import { At, MoodSmile } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import useAuth from "../../context/Auth.context";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const { user, userset} = useAuth();

  const [password, setPassword] = React.useState("");

  return (
    <div className="bg1">
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
            Hello, Visitor !
          </Text>
        </Grid.Col>

        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter your email. 😀"
            label="Email"
            description="Please Enter a valid Email."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // error='Please Enter a valid Last name.'
            variant="filled"
            radius="lg"
            size="md"
            required
            icon={<At size={14} />}
            type="email"
          />
        </Grid.Col>

        <Grid.Col md={6}>
          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
            // error='Please entet a password'
            variant="filled"
            radius="lg"
            size="md"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid.Col>

        <Grid.Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            leftIcon={<MoodSmile size={24} />}
            variant="subtle"
            color="grape"
            radius="lg"
            size="md"
            onClick={async () => {
              axios.post("http://localhost:3003/api/v1/auth/sign_in_user", {
                  email,
                  password,
                })
                .then(function (response) {
                  const data = response.data;
                  const Name = data.user.Name;
                  const email = data.user.email;
                  const phone = data.user.phone;
                  const token = data.token;
                  const Userdata = { Name, email, phone, isRest: false, token };
                  userset(Userdata);
                  localStorage.setItem("User", JSON.stringify(Userdata));
                  let dt= +new Date();
                  localStorage.setItem("Time", JSON.stringify(dt));
                })
                .catch(function (e) {
                  showNotification({
                    title: 'Login Error',
                    message: "email or password not matched",
                    });
                });
              console.log(user);
              navigate("/");
            }}
          >
            Sign In
          </Button>

          <h6>Or</h6>

          <Button
            leftIcon={<MoodSmile size={24} />}
            variant="subtle"
            color="grape"
            radius="lg"
            size="md"
            onClick={() => {
              navigate("/join");
            }}
          >
            Sign Up
          </Button>

          <h6>Or</h6>

          <Button
            leftIcon={<MoodSmile size={24} />}
            variant="subtle"
            color="grape"
            radius="lg"
            size="md"
            onClick={() => {
              navigate("/rest");
            }}
          >
            Sign Up/In Restaurant
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
    </div>
  );
}
