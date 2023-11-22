import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
// import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buySubscription, loadUser } from '../../redux/actions/user';
import { useNavigate} from 'react-router-dom';
// import { server } from '../../redux/store';
import toast from 'react-hot-toast';

const Subscribe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(buySubscription());
    dispatch(loadUser());
    navigate('/profile');
  };

  const { loading, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <Container h="90vh" p="5">
      <Heading children="Welcome" my="8" textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Access to Lectures`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text children={`Subscribe and Get Access to all The Content.`} />
          </VStack>

          <Link to="/profile">
          <Button
            my="8"
            w="full"
            colorScheme={'yellow'}
            onClick={submitHandler}
            isLoading={loading}
          >
            Subscribe Now
          </Button>
          </Link>           
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            textTransform="uppercase"
            size="sm"
            children={'*Terms and Conditions Apply'}
          />

        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;