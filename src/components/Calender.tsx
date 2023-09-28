import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { getMonth } from "../utils";
import CalenderHeader from "./CalenderHeader";
import Month from "./Month";
import dayjs from "dayjs";

const Calender: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth());

  return (
    <>
      <Flex width={"full"} gap={'5'} height={"100vh"} flexDir={"column"} padding={'50px'}>
        <CalenderHeader />
        <Flex width={'100%'} gap={'5'}>
          <Month month={currentMonth} />
        </Flex>
      </Flex>
    </>
  );
};

export default Calender;
