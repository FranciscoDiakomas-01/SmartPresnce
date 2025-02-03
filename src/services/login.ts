
export interface Body {
  email ?: string,
  password ?: string,
  type ? : number
}
export default async function loginFunc(body : Body) {
  
  const adminAPI = "http://localhost:8080/admin/login";
  const coordAPI = "http://localhost:8080/coord/login";
  const teacherAPI = "http://localhost:8080/teacher/login";
  try {
    
    if(body.type == 1) {
      const API = await fetch(adminAPI , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
      })
      const response = await API.json()
      return response
    }else if (body.type == 2) {
      const API = await fetch(teacherAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const response = await API.json();
      return response;
    } else {
      const API = await fetch(coordAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const response = await API.json();
      return response;
    }

  } catch (error) {
    
    return error
  }

}