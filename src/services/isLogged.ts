
export default function isLogged() {
  const token = localStorage.getItem("token")
  return token !== null
}