
export async function DashBoard() {
  const url = "http://localhost:8080/admin/dash";
  const token = localStorage.getItem("token")
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json()
  console.log(response)
  return response
  
}


export async function getAdminData() {
  const url = "http://localhost:8080/admin";
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json();
  console.log(response);
  return response;
}


export async function getAdminVariables() {
  const url = "http://localhost:8080/adminvariable";
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const response = await API.json();
  console.log(response);
  return response;
}
interface IADmin {
  name: string;
  lastname: string;
  email: string;
  password: string;
  oldpassword: string;
  oldemail: string;
}

export async function updateAdmin(adimn : IADmin) {
  const url = "http://localhost:8080/admin";
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(adimn),
  });
  const response = await API.json();
  return response;
}

  
interface IVariables {
  coord: string;
  teacher: string;
} 

export async function updateAdminVariables(Variables: IVariables) {
  const url = "http://localhost:8080/adminvariable";
  const token = localStorage.getItem("token");
  const API = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(Variables),
  });
  const response = await API.json();
  return response;
}