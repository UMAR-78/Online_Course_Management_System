import { Box, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            fontFamily={'body'}
            size="sm"
            children="Happy Learning"
            color={'yellow.400'}
          />
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;