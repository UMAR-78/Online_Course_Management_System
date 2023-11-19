import {
    Button,
    Container,
    Grid,
    Heading,
    Input,
    VStack,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { buySubscription } from '../../redux/actions/user';
  import { useNavigate} from 'react-router-dom';
  import toast from 'react-hot-toast';
  
  const Payment = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitHandler = async e => {
      
      e.preventDefault();
      await dispatch(buySubscription(name, number, expiry, cvc));
      if (dispatch(buySubscription(name, number, expiry, cvc)))
      navigate('/paymentsuccess');
      else
      navigate('/paymentfail');
      
    //     if(dispatch(buySubscription(name, number, expiry, cvc))) {
    //       setTimeout(() => {
    // navigate("/paymentsuccess")
    //       }, 2000);
    //     }
    
      // debugger
      // if (message) {
      //   toast.success(message);
      //   dispatch({ type: 'clearMessage' });
      //   // Redirect to payment success page after successful payment
      //   // history.push('/paymentsuccess');
      // }
      // if (error) {
      //   toast.error(error);
      //   dispatch({ type: 'clearError' });
      // }
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
      <Grid
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        <Container py="16">
          <form onSubmit={submitHandler}>
            <Heading
              textTransform={'uppercase'}
              children="Payment Gateway"
              my="16"
              textAlign={['center', 'left']}
            />
  
            <VStack m="auto" spacing={'8'}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Card Holder Name"
                type={'text'}
                focusBorderColor="yellow.500"
              />
              <Input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Card Number"
                type={'text'}
                focusBorderColor="yellow.500"
              />
              <Input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="Expiry Date"
                type={'text'}
                focusBorderColor="yellow.500"
              />
              <Input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="Enter Card CVC"
                type={'text'}
                focusBorderColor="yellow.500"
              />
  
              <Button
                isLoading={loading}
                w="full"
                colorScheme={'yellow'}
                type="submit"
              >
                Confirm Payment
              </Button>
            </VStack>
          </form>
        </Container>
      </Grid>
    );
  };
  
  export default Payment;
  