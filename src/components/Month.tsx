import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import Day from "./Day";

interface MonthProps {
  month: dayjs.Dayjs[][];
}

const Month: React.FC<MonthProps> = ({ month }) => {
  return (
    <>
      <Flex width={'full'}>
        <Grid templateColumns="repeat(7, 1fr)" gap={1} width={'full'}>
          {month.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, index) => (
                <Day day={day} key={index} />
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default Month;
