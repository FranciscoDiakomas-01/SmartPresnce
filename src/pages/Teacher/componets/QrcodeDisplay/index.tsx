
import './index.css'
import QRCode from 'react-qr-code'
export default function TecherQrCode(){

  const token  = String(localStorage.getItem("token"))
  return (
    <article id="qrcodePro">
      <QRCode value={token} size={256} bgColor='var(--blue2)' fgColor='white'  />
    </article>
  );

}