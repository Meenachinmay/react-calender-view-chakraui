import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

interface DayProps {
  day: dayjs.Dayjs;
}

const Day: React.FC<DayProps> = ({ day }) => {
  return (
    <Flex
      width={"full"}
      height={'100px'}
      bg={'gray.100'}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"5px"}
      flexDir={"column"}
      p={1}
      my={1}
      _hover={{ bg: "gray.200", boxShadow: 'xl'}}
      cursor={'pointer'}
    >
      <Flex flexDir={"column"} alignItems={'center'}>
        <Text fontSize={"sm"}>{day.format("ddd").toUpperCase()}</Text>
        <Text fontSize={"sm"}>{day.format("DD")}</Text>
      </Flex>
    </Flex>
  );
};

export default Day;
