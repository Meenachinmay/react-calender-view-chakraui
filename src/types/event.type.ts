export interface IEvent {
  id: number;
  user_id: string,
  title: string;
  description: string;
  date: string
  startTime: string,
  endTime: string,
  zoomLink?: string,
}

export interface IMeeting {
  id: number;
  user_id: string,
  title: string;
  description: string;
  date: string; // format: DD-MM-YYYY
  startTime: string; // format: HH:mm
  endTime: string; // format: HH:mm
  zoomLink?: string; // this will be added after the meeting is created in Zoom
}
