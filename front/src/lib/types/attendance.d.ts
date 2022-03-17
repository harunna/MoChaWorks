namespace AttendanceApi.Get {
  interface Request {
    userId: string,
    month: string
  }

  interface Response {
    userId: string;
    workDate: string;
    workRecord: {
      start: string;
      end: string;
      place: string;
    }
    total: string;
    overtime: string;
  }
}

namespace AttendanceApi.Post {
  interface Request {
    userId: string;
    workDate: string;
    workRecord: {
      start: string;
      end: string;
      place: string;
    }
    total: string;
    overtime: string;
  }

  interface Response {}
}

namespace AttendanceApi.Put {
  interface Request {
    userId: string;
    workDate: string;
    workRecord: {
      start: string;
      end: string;
      place: string;
    }
    total: string;
    overtime: string;
  }
  interface Response {}
}