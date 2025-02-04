
import './index.css'
export default function TecherQrCode(){

  const token  = String(localStorage.getItem("token"))
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${token}`
  return (
    <article id="qrcodePro">
      <img src={url}/>
    </article>
  );

}