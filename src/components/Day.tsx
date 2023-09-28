import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

interface DayProps {
  day: dayjs.Dayjs;
}

const Day: React.FC<DayProps> = ({ day }) => {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  }
  return (
    <Flex
      width={"full"}
      height={"100px"}
      bg={getCurrentDayClass() ? "orange.300" : "gray.100"}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"5px"}
      flexDir={"column"}
      p={1}
      my={1}
      _hover={{
        bg: getCurrentDayClass() ? "orange.300" : "gray.200",
        boxShadow: "xl",
        borderBottom: "2px solid",
        borderBottomColor: "orange.500",
      }}
      cursor={"pointer"}
      transition={"ease-in-out"}
    >
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        color={getCurrentDayClass() ? "white" : "gray.800"}
        fontWeight={getCurrentDayClass() ? 'bold' : 'normal'}
      >
        <Text fontSize={"sm"}>{day.format("ddd").toUpperCase()}</Text>
        <Text fontSize={"sm"}>{day.format("DD")}</Text>
      </Flex>
    </Flex>
  );
};

export default Day;
