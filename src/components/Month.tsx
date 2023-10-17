import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Day from "./Day";
import { IEvent } from "../types/event.type";
import GlobalContext from "../context/GlobalContext";

interface MonthProps {
  month: dayjs.Dayjs[][];
  eventsByDate: { [date: string]: IEvent[] };
}

const Month: React.FC<MonthProps> = ({ month, eventsByDate }) => {
  const { dayIndex, monthIndex, setDayIndex, setMonthIndex } =
    useContext(GlobalContext);

  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}:00` : `${i}:00`
  );

  const getReferenceDay = useCallback(() => {
    return dayjs().month(monthIndex).date(dayIndex);
  },[dayIndex, monthIndex]);
  const [referenceDay, setReferenceDay] = useState(getReferenceDay()); 
  console.log('reference day index ', referenceDay);

  // Get the next 7 days starting from the current date
  const getNextWeek = (startDay: dayjs.Dayjs) => {
    return new Array(7).fill(null).map((_, index) => {
      return startDay.add(index, "day");
    });
  };
  const [nextWeek, setNextWeek] = useState<dayjs.Dayjs[]>(
    getNextWeek(referenceDay)
  );

  useEffect(() => {
    setReferenceDay(getReferenceDay());
    setNextWeek(getNextWeek(referenceDay));
  }, [monthIndex, dayIndex]);

  useEffect(() => {
    setNextWeek(getNextWeek(referenceDay));
  }, [referenceDay]);

  const handlePreviousWeek = () => {
    setReferenceDay((prevDay) => prevDay.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setReferenceDay((prevDay) => prevDay.add(1, "week"));
  };

  const handleTimeSlotClick = (day: dayjs.Dayjs, time: string) => {
    alert(`You clicked on ${day.format("DD-MM-YYYY")} at ${time}`);
  };

  return (
    <>
      <Flex width={"full"} flexDir={'column'}>
        <Flex direction="row" justifyContent="space-between" marginBottom="10px">
          <Button size={'sm'} onClick={handlePreviousWeek}>Previous Week</Button>
          <Button size={'sm'} onClick={handleNextWeek}>Next Week</Button>
        </Flex>
        {/* <Grid templateColumns="repeat(7, 1fr)" gap={1} width={"full"}>
          {nextWeek.map((day, index) => (
            <Day
              day={day}
              key={index}
              events={eventsByDate[day.format("DD-MM-YYYY")]}
            />
          ))}
        </Grid> */}
        <Table variant={"simple"}>
          <TableCaption>Testing table</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              {nextWeek.map((day, index) => (
                <Th>
                  <Day
                    day={day}
                    key={index}
                    events={eventsByDate[day.format("DD-MM-YYYY")]}
                  />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {timeSlots.map((time) => (
              <Tr key={time}>
                <Th>{time}</Th>
                {nextWeek.map((day, index) => (
                  <Td
                    key={index}
                    onClick={() => handleTimeSlotClick(day, time)}
                  >
                    booking status
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};

export default Month;
