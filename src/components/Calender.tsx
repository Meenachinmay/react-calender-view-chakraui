import React, { useContext, useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { getMonth, processEventsIntoDateStructure } from "../utils";
import CalenderHeader from "./CalenderHeader";
import Month from "./Month";
import GlobalContext from "../context/GlobalContext";

import { events } from "../data-array/event.index";
import { IEvent } from "../types/event.type";

const Calender: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [eventsByDate, setEventsByDate] = useState<{
    [date: string]: IEvent[];
  }>({});
  const { monthIndex } = useContext(GlobalContext);

  // set month and fetch events
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    const processedEvents = processEventsIntoDateStructure(events);
    setEventsByDate(processedEvents);
  }, [monthIndex]);
 

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
          <Month month={currentMonth} eventsByDate={eventsByDate} />
        </Flex>
      </Flex>
    </>
  );
};

export default Calender;
