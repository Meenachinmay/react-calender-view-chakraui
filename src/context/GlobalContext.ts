import React from 'react';
import { User } from '../types/auth-user.type';

interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  dayIndex: number;
  setDayIndex: (index: number) => void;
  eventModel: boolean;
  setEventModel: (open: boolean) => void;
  authState: User | null;
  setAuthState: (authState: User | null) => void;
}

const defaultValues: GlobalContextType = {
  monthIndex: 0,
  setMonthIndex: () => {},
  dayIndex: 0,
  setDayIndex: () => {},
  eventModel: false,
  setEventModel: () => {},
  authState: null,
  setAuthState: () => {},
};

const GlobalContext = React.createContext<GlobalContextType>(defaultValues);

export default GlobalContext;
