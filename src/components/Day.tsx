import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IDay } from "../types/day.type";
import { IEvent } from "../types/event.type";
import { events } from "../data-array/event.index";

const Day: React.FC<IDay> = ({ day }: IDay) => {
  const [eventsToRender, setEventsToRender] = useState<IEvent[] | null>(null);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  }

  useEffect(() => {
    const data: IEvent[] = events.filter((e) => {
      return e.date === day.format("DD-MM-YYYY");
    });
    if (data) {
      setEventsToRender(data);
    }
    console.log(eventsToRender);
    console.log('render')
  }, [day]);

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
        fontWeight={getCurrentDayClass() ? "bold" : "normal"}
      >
        <Text fontSize={"sm"}>{day.format("ddd").toUpperCase()}</Text>
        <Text fontSize={"sm"}>{day.format("DD")}</Text>
      </Flex>
      <Flex width={'full'} gap={1}>
        {eventsToRender?.map((e) => (
          <p key={e.id} style={{ fontSize: "10px" }}>{e.title}</p>
        ))}
      </Flex>
    </Flex>
  );
};

export default Day;
