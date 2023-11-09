import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  
  export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };

  
  const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
  
    return (
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'8'}>
          <Heading textTransform={'uppercase'} children={'Registration'} />
  
          <form style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="abc"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
  
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Address" />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type={'email'}
                focusBorderColor="yellow.500"
              />
            </Box>
  
            <Box my={'4'}>
              <FormLabel htmlFor="password" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={'password'}
                focusBorderColor="yellow.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="role" children="Role" />
              <Input
                required
                id="role"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="Admin or User"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
              
            <Button my="4" colorScheme={'yellow'} type="submit">
              Sign Up
            </Button>
  
            <Box my="4">
              Already Signed Up?{' '}
              <Link to="/login">
                <Button colorScheme={'yellow'} variant="link">
                  Login
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    );
  };
  
  export default Register;
  