
export async function getAllCalendarByTeacherId(id: number) {
  const url = `http://localhost:8080/calendar/${id}`;
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json();
  return response;
}


export async function getAllCalendarByTeacher() {
  const url = `http://localhost:8080/calendar`;
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json();
  return response;
}


export async function getTeacherCalendarByToken() {
  const token = localStorage.getItem("token");
  const url = `http://localhost:8080/calendarbytoken`;
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json();
  return response;
}

export async function deleteCalendarVyId(id: number) {
  const url = `http://localhost:8080/calendar/${id}`;
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method : "DELETE"
  });
  const response = await API.json();
  return response;
}


export async function getAllNames() {
  const url = `http://localhost:8080/allteachers`;
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json();
  return response;
}

interface calendar {
  teaherid: number;
  week_day: string;
  hour_start: string;
  hour_end: string;
}
export async function CreateCalendar(calendar: calendar) {
  try {
    const url = `http://localhost:8080/calendar/${calendar.teaherid}`;
    const token = localStorage.getItem("token");
    const API = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(calendar),
    });
    const response = await API.json();
    return response;
  } catch (error) {
    return error as string
  }
}
