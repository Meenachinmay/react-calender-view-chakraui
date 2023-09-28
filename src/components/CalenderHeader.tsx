import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const CalenderHeader:React.FC = () => {
  return (
    <Flex width={'full'} bg={'green.500'}>
      <Text>Header from calender</Text> 
    </Flex>
  )
}

export default CalenderHeader;
