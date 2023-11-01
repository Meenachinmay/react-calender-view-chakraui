import { ReactNode, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { User } from "../types/auth-user.type";

interface ContextWrapperProps {
  children: ReactNode;
}

export default function ContextWrapper(props: ContextWrapperProps) {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [dayIndex, setDayIndex] = useState<number>(dayjs().date());
  const [eventModel, setEventModel] = useState<boolean>(false);
  const [authState, setAuthState] = useState<User | null>(null);
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        dayIndex,
        setDayIndex,
        setMonthIndex,
        setEventModel,
        eventModel,
        authState,
        setAuthState
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
