import { Button, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { IEvent } from "../types/event.type";

import "../components/month.css";

interface MonthProps {
  month: dayjs.Dayjs[][];
  eventsByDate: { [date: string]: IEvent[] };
}

const dayMapping = {
  Sun: "日",
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
};

const monthMapping = {
  January: "１月",
  February: "２月",
  March: "３月",
  April: "４月",
  May: "５月",
  June: "６月",
  July: "７月",
  August: "８月",
  September: "９月",
  October: "１０月",
  November: "１１月",
  December: "１２月",
};

const Month: React.FC<MonthProps> = ({ month, eventsByDate }) => {
  const { dayIndex, monthIndex } = useContext(GlobalContext);

  // generating times slots from 9:30 to 7:30
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 19; hour++) {
      for (let min = 0; min < 60; min += 30) {
        // Skip the 9:00 slot since you want to start from 9:30
        if (hour === 9 && min === 0) continue;

        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMin = min === 0 ? `00` : `${min}`;
        slots.push(`${formattedHour}:${formattedMin}`);
      }
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  const getReferenceDay = useCallback(() => {
    return dayjs().month(monthIndex).date(dayIndex);
  }, [dayIndex, monthIndex]);
  const [referenceDay, setReferenceDay] = useState(getReferenceDay());

  // Get the next 7 days starting from the current date
  const getNextWeek = (startDay: dayjs.Dayjs) => {
    return new Array(7).fill(null).map((_, index) => {
      return startDay.add(index, "day");
    });
  };
  const [nextWeek, setNextWeek] = useState<dayjs.Dayjs[]>(
    getNextWeek(referenceDay)
  );

  // check for booked dates
  const isBooked = (day: dayjs.Dayjs, time: string) => {
    const dayEvents = eventsByDate[day.format("DD-MM-YYYY")] || [];
    return dayEvents.some(
      (event) => time >= event.startTime && time <= event.endTime
    );
  };

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
      <Flex width={"full"} height={"100vh"}>
        <Flex width={"full"} flexDir={"column"}>
          <Flex
            direction="row"
            justifyContent="space-between"
            width={"full"}
            padding={"10px"}
          >
            <Button
              bg={"blue.800"}
              fontWeight={"bold"}
              color={"white"}
              size={"xs"}
              onClick={handlePreviousWeek}
            >
              Previous Week
            </Button>
            <Button
              bg={"blue.800"}
              fontWeight={"bold"}
              color={"white"}
              size={"xs"}
              onClick={handleNextWeek}
            >
              Next Week
            </Button>
          </Flex>

          {/* Rendering time slots table here  */}
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span>{referenceDay.format("YYYY")}年</span>{" "}
                    {/* This will give the full year */}
                    <span style={{ fontSize: '11px', fontWeight: 'bolder'}}>
                      {monthMapping[referenceDay.format("MMMM")]}
                    </span>{" "}
                    {/* This will give the full month name */}
                  </div>
                </th>
                {nextWeek.map((day, index) => (
                  <th key={index}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>{day.format("DD")}</span>
                      <span>{dayMapping[day.format("ddd")]}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td>{time}</td>
                  {nextWeek.map((day, index) => (
                    <td
                      key={index}
                      onClick={() => handleTimeSlotClick(day, time)}
                    >
                      {isBooked(day, time) ? (
                        <div className="slot">
                          <span></span>
                        </div>
                      ) : (
                        <div className="__vacant__booking__">
                          <span></span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
        <Flex
          width={"full"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          second side of page
        </Flex>
      </Flex>
    </>
  );
};

export default Month;
