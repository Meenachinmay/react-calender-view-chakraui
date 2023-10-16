import { Flex, Portal, Select, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import "../../App.css"; // import our custom css for the blur effect
import { IEvent } from "../../types/event.type";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  meetingsForTheDay: IEvent[];
}

const Model: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  children,
  meetingsForTheDay,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | []>([]);

  const timeSlots: string[] = [
    "9:00AM - 10:00AM",
    "10:00AM - 11:00AM",
    "11:00AM - 12:00PM",
    "12:00PM - 1:00PM",
    "1:00PM - 2:00PM",
    "2:00PM - 3:00PM",
    "3:00PM - 4:00PM",
    "4:00PM - 5:00PM",
    "5:00PM - 6:00PM",
    "6:00PM - 7:00PM",
  ];

  // Determine which slots are booked
  const bookedSlots = meetingsForTheDay
    ? meetingsForTheDay.map(
        (meeting) => `${meeting.startTime} - ${meeting.endTime}`
      )
    : [];

  // Filter out the booked slots
  const availableSlots = timeSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  if (!isOpen) return null;
  
  console.log(selectedSlot);

  return (
    <Portal>
      <Flex
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        justifyContent="center"
        alignItems="center"
        className={`model-overlay`}
        onClick={onClose}
      >
        <Flex
          justifyContent={"center"}
          bg="white"
          width={"600px"}
          height={"400px"}
          p={5}
          borderRadius="md"
          boxShadow="xl"
          onClick={(e) => e.stopPropagation()} // to prevent modal close when clicking inside
          opacity={1}
          flexDirection={"column"}
        >
          {children}
          {/* Render existing meetings */}
          <VStack align="start" spacing={4} mb={4}>
            <Text fontWeight="bold" fontSize="lg">
              Existing Meetings:
            </Text>
            {meetingsForTheDay && meetingsForTheDay.length > 0 ? (
              meetingsForTheDay.map((meeting) => (
                <Text key={`${meeting.startTime}-${meeting.endTime}`}>
                  {meeting.startTime} - {meeting.endTime}
                </Text>
              ))
            ) : (
              <Text>No meetings scheduled for this day.</Text>
            )}
          </VStack>
          <Flex width={"full"} height={"full"}>
            <Select
              variant="filled"
              placeholder="Select a slot"
              value={selectedSlot || ""}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      </Flex>
    </Portal>
  );
};

export default Model;
