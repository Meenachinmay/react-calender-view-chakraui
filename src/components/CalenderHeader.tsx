import React, { useContext } from "react";
import { Button, Flex, Text, Icon, Tooltip } from "@chakra-ui/react";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import GlobalContext from "../context/GlobalContext";

const CalenderHeader: React.FC = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <Flex
      width={"full"}
      height={"50px"}
      transition={"ease-in-out"}
      gap={"3"}
      alignItems={"center"}
      px={4}
    >
      <Button
        size={"sm"}
        borderRadius={"0px"}
        fontWeight={"normal"}
        bg={"orange.400"}
        color={"gray.800"}
        width={"100px"}
        _hover={{ bg: "orange.500" }}
      >
        Today
      </Button>
      <Tooltip label="Previous day">
        <Button size={"sm"} onClick={() => handlePrevMonth()}>
          <Icon as={AiOutlineLeft} />
        </Button>
      </Tooltip>
      <Tooltip label="Next day">
        <Button size={"sm"} onClick={() => handleNextMonth()}>
          <Icon as={AiOutlineRight} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default CalenderHeader;
