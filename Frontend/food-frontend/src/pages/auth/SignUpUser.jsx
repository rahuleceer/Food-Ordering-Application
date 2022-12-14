import React from 'react';
import "./signbg.css";
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
import useAuth from '../../context/Auth.context';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

export default function SingUp() {
  const [Name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  
  const navigate = useNavigate();

  const { user, userset } = useAuth();

  return (
    <div className="bg">
    <Container>
      <Grid
        style={{
          marginTop: '20px',
        }}
        grow
        gutter='xl'
      >
        <Grid.Col span={12}>
          <Text size='xl' weight={700}>
            Hello, Visitor !
          </Text>
        </Grid.Col>
        <Grid.Col md={6}>
          <TextInput
            placeholder='Enter your name. 😀'
            label='Name'
            description='Please Enter a validname.'
            value={Name}
            onChange={(e) => setName(e.target.value)}
            // error='Please Enter a valid First name.'
            variant='filled'
            radius='lg'
            size='md'
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            placeholder='Enter your email. 😀'
            label='Email'
            description='Please Enter a valid Email.'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // error='Please Enter a valid Last name.'
            variant='filled'
            radius='lg'
            size='md'
            required
            icon={<At size={14} />}
            type='email'
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            placeholder='Enter your phone. 😀'
            label='Phone Number'
            description='Please Enter a valid Phone number.'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // error='Please Enter a valid Last name.'
            variant='filled'
            radius='lg'
            size='md'
            required
            icon={<PhoneCall size={14} />}
            type='tel'
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <PasswordInput
            placeholder='Password'
            label='Password'
            description='Password must include at least one letter, number and special character'
            // error='Please entet a password'
            variant='filled'
            radius='lg'
            size='md'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <PasswordInput
            placeholder='Confirm  Password'
            label='Confirm Password'
            description='Password must include at least one letter, number and special character'
            error=''
            variant='filled'
            radius='lg'
            size='md'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col
          span={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            leftIcon={<MoodSmile size={24} />}
            fullWidth
            variant='subtle'
            color='grape'
            radius='lg'
            size='md'
            onClick={async () => {
                if (!Name) {
                  const error = new Error("name is required");
                  throw error;
                }

                if (password !== confirmPassword) {
                  const error = new Error("Passwords don't match");
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
                
                axios.post("http://localhost:3003/api/v1/auth/sign_up_user", {
                  Name,
                  email,
                  phone,
                  password,
                  confirmPassword,
                })
                .then(function (response) {
                  const Userdata = {Name, email, phone, isRest: false, token: response.data.token};
                  userset(Userdata);
                  localStorage.setItem("User", JSON.stringify(Userdata));
                  let dt= +new Date();
                  localStorage.setItem("Time", JSON.stringify(dt));
                })
                .catch(function (e) {
                  showNotification({
                    title: 'Login Error',
                    message: e.message,
                    });
                });
                
                navigate("/");
            }}
          >
            Sign Up
          </Button>
          <h6>or</h6>
          <Button
            leftIcon={<MoodSmile size={24} />}
            fullWidth
            variant='subtle'
            color='grape'
            radius='lg'
            size='md'
            onClick={() => {
              navigate('/');
            }}
          >
            Sign In
          </Button>
          <h6>or</h6>
          <Button
            leftIcon={<MoodSmile size={24} />}
            fullWidth
            variant='subtle'
            color='grape'
            radius='lg'
            size='md'
            onClick={() => {
              navigate('/rest');
            }}
          >
            Sign In/Up Restaurant
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
    </div>
  );
}
