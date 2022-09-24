import React from 'react';
import {
  Container,
  Grid,
  TextInput,
  PasswordInput,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
  Text,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { At, PhoneCall, MoodSmile } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  const [password, setPassword] = React.useState('');
  const [user,setUser] = React.useState('');

  return (
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
            variant='subtle'
            color='grape'
            radius='lg'
            size='md'
            onClick={async () => {
              try{
                const res = await axios.post("https://localhost:3003/api/v1/auth/sign_in_user", {
                  email,
                  password,
                });
                const data = res.data.json;
                const Name = data.Name;
                const email = data.email;
                const phone = data.phone;
                const token = data.token;
                const Userdata = {Name, email, address, phone, isRest: false, token: data.token};
                setUser(Userdata);
                localStorage.setItem('User', Userdata);
                navigate("/");
              }catch(e){
                showNotification({
                title: 'Login Error',
                message: e.message,
                });
              }
            }}
          >
            Sign In
          </Button>

          <h6>Or</h6>

          <Button
            leftIcon={<MoodSmile size={24} />}
            variant='subtle'
            color='grape'
            radius='lg'
            size='md'
            onClick={() => {
              navigate('/join');
            }}
          >
            Sign Up
          </Button>

          <h6>Or</h6>

          <Button
            leftIcon={<MoodSmile size={24} />}
            variant='subtle'
            color='grape'
            radius='lg'
            size='md'
            onClick={() => {
              navigate('/rest');
            }}
          >
            Sign Up/In Restaurant
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
