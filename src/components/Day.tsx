import React, { useContext, useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IDay } from "../types/day.type";

import "../App.css";
import GlobalContext from "../context/GlobalContext";
import EventDetailModal from "./ui-models/EventDetailModal";
import Model from "./ui-models/EventDetailModal";

const Day: React.FC<IDay> = ({ day, events }: IDay) => {
  const [dayColor, setDayColor] = useState<string>("gray.100");
  const { eventModel, setEventModel } = useContext(GlobalContext);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  }

  useEffect(() => {
    // If the day has events and it's also today's date
    if (
      events?.length &&
      day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
    ) {
      setDayColor("orange.300");
      return; // early exit from the useEffect
    }

    // If the day has events
    if (events?.length) {
      setDayColor("orange.100");
      return; // early exit from the useEffect
    }

    // If it's today's date
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      setDayColor("orange.300");
      return; // early exit from the useEffect
    }

    // Fall back to original color
    // You can also handle any other default or fallback colors if required.
    setDayColor("gray.100");
  }, [day, events]);

  return (
    <>
      <Flex
        width={"full"}
        height={"100px"}
        className="day_card"
        //   bg={getCurrentDayClass() ? "orange.300" : 'gray.100'}
        bg={dayColor}
        border={"1px solid"}
        borderColor={"gray.100"}
        borderRadius={"5px"}
        flexDir={"column"}
        p={1}
        my={1}
        _hover={{
          // bg: getCurrentDayClass() ? "orange.300" : "gray.100",
          bg: dayColor,
          boxShadow: "xl",
          borderBottom: "2px solid",
          borderBottomColor: "orange.500",
        }}
        cursor={"pointer"}
        transition={"ease-in-out"}
        overflowX={"scroll"}
        onClick={() => setEventModel(true)}
      >
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          color={getCurrentDayClass() ? "white" : "gray.800"}
          fontWeight={getCurrentDayClass() ? "bold" : "normal"}
        >
          <Text fontSize={"sm"}>{day.format("ddd").toUpperCase()}</Text>
          <Text fontSize={"sm"}>{day.format("DD")}</Text>
        </Flex>
        <Flex width={"full"} maxWidth={"full"} gap={1} wrap={"wrap"}>
          {events?.map((e) => (
            <div className="events_dots" key={e.id}></div>
          ))}
        </Flex>
      </Flex>
      <Model isOpen={eventModel} onClose={() => setEventModel(false)}>
        <h1>Your Content Here</h1>
        <p>This is a reusable modal component.</p>
      </Model>
    </>
  );
};

export default Day;
