import React, { useContext, useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { getMonth } from "../utils";
import CalenderHeader from "./CalenderHeader";
import Month from "./Month";
import GlobalContext from "../context/GlobalContext";

const Calender: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
   setCurrentMonth(getMonth(monthIndex)); 
  }, [monthIndex])

  return (
    <>
      <Flex
        width={"full"}
        gap={"1"}
        height={"100vh"}
        flexDir={"column"}
        padding={"50px"}
      >
        <CalenderHeader />
        <Flex width={"100%"} gap={"5"}>
          <Month month={currentMonth} />
        </Flex>
      </Flex>
    </>
  );
};

export default Calender;
