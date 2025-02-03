import qcode from '../../../../assets/qr.png'
import './index.css'

export default function TecherQrCode(){

  return(
    <article id='qrcodePro'>
      <img src={qcode} alt='QrCode'/>
    </article>
  )

}