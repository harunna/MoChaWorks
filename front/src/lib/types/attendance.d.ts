namespace AttendanceApi.Get {
  interface Request {
    user_id: string,
    month: string
  }

  interface Response {
    user_id: string;
    work_date: string;
    work_record: {
      start: string;
      end: string;
      place: string;
    }
    total: string;
    overtime: string;
  }
}