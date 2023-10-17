import { ReactNode, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper(props: ContextWrapperProps) {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [dayIndex, setDayIndex] = useState<number>(dayjs().date());
  const [eventModel, setEventModel] = useState<boolean>(false);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        dayIndex,
        setDayIndex,
        setMonthIndex,
        setEventModel,
        eventModel,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
