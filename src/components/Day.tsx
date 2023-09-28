import React from "react";
import { Flex } from '@chakra-ui/react';
import dayjs from "dayjs";

interface DayProps {
    day: dayjs.Dayjs,
}

const Day: React.FC<DayProps> = ({ day }) => {
  return (
    <Flex
      width={"full"}
      height={"10"}
      bg={"red.500"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {day.format()}
    </Flex>
  );
};

export default Day;
