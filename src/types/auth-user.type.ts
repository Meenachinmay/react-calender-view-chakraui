export interface User {
    id: number,
    email: string,
    meetings: Meeting[],
    zoomAccessToken: string,
    zoomRefreshToken: string,
}

export interface Meeting {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  zoomUrl: string;
  isCompleted: boolean;
  userId: number;
  createdAt: Date;
}
