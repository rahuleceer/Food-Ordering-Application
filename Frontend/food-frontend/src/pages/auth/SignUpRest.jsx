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
import { At, PhoneCall, MoodSmile } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/Auth.context";
import axios from "axios";
import { showNotification } from '@mantine/notifications';

export default function SignUpRest() {
  const [Name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const { user, userset } = useAuth();

  return (
    <div className="bg">
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
        <Grid.Col md={6}>
          <TextInput
            placeholder="Enter your name. 😀"
            label="Name"
            description="Please Enter a validname."
            value={Name}
            onChange={(e) => setName(e.target.value)}
            // error='Please Enter a valid First name.'
            variant="filled"
            radius="lg"
            size="md"
            required
          />
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
        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter your Address. 😀"
            label="Address"
            description="Please Enter your Address."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            // error='Please Enter a valid Last name.'
            variant="filled"
            radius="lg"
            size="md"
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            placeholder="Enter your phone. 😀"
            label="Phone Number"
            description="Please Enter a valid Phone number."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // error='Please Enter a valid Last name.'
            variant="filled"
            radius="lg"
            size="md"
            required
            icon={<PhoneCall size={14} />}
            type="tel"
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
        <Grid.Col md={6}>
          <PasswordInput
            placeholder="Confirm  Password"
            label="Confirm Password"
            description="Password must include at least one letter, number and special character"
            error=""
            variant="filled"
            radius="lg"
            size="md"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            fullWidth
            variant="subtle"
            color="grape"
            radius="lg"
            size="md"
            onClick={async () => {
              try {
                if (!Name) {
                  const error = new Error("name is required");
                  throw error;
                }

                if (password !== confirmPassword) {
                  const error = new Error("Passwords don't match");
                  throw error;
                }

                if (!address) {
                  const error = new Error("address is required");
                  throw error;
                }

                if (!phone) {
                  const error = new Error("phone is required");
                  throw error;
                }

                if (!email) {
                  const error = new Error("Email is required");
                  throw error;
                }

                const res = await axios.post("http://localhost:3003/api/v1/auth/sign_up_rest", {
                  Name,
                  email,
                  address,
                  phone,
                  password,
                  confirmPassword,
                }).then(function (response) {
                  const Userdata = {Name, email, address, phone, isRest: true, token: response.data.token};
                  userset(Userdata);
                  localStorage.setItem("User", JSON.stringify(Userdata));
                  let dt= +new Date();
                  localStorage.setItem("Time", JSON.stringify(dt));
                })
                .catch(function (error) {
                  console.log(error);
                });
                
                navigate("/homerest");
              } catch (e) {
                showNotification({
                  title: "Sign Up Error",
                  message: e.message,
                });
              }
            }}
          >
            Sign Up
          </Button>
          <h6>or</h6>
          <Button
            leftIcon={<MoodSmile size={24} />}
            fullWidth
            variant="subtle"
            color="grape"
            radius="lg"
            size="md"
            onClick={() => {
              navigate("/rest");
            }}
          >
            Sign In
          </Button>

          <h6>or</h6>
          <Button
            leftIcon={<MoodSmile size={24} />}
            fullWidth
            variant="subtle"
            color="grape"
            radius="lg"
            size="md"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign In/Up User
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
    </div>
  );
}
