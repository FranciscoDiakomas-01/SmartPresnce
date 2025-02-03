/* eslint-disable @typescript-eslint/no-unused-vars */
import './index.css'
import { useState } from "react";
    import { Html5QrcodeScanner } from "html5-qrcode";
    import './index.css';
    
export default function TecherQrCode(){
      const [qrCodeData, setQrCodeData] = useState(""); // Dados do QR Code
      const [scanner, setScanner] = useState(); 
      const [isScanning, setIsScanning] = useState(false); // Controla se o scanner está ativo
    
      // Função para iniciar o scanning
      const startScanning = () => {
          const newScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 550 },
            false
          );
    
          newScanner.render(
            (decodedText) => {
              console.log("QR Code detectado:", decodedText);
              setQrCodeData(decodedText);
            },
            (error) => {
              console.error("Erro ao escanear QR Code:", error);
            }
          );
    
        setScanner(newScanner);
        setIsScanning(true); 
      };
    
      // Função para parar o scanning
      const stopScanning = () => {
        if (scanner) {
          scanner.clear(); // Limpa o scanner
        }
    
        setIsScanning(false); // Desativa o estado de scanning
        setQrCodeData(null); // Reseta os dados do QR Code
      };
      return(
    <article id='qrcodePro'>
        <div id="qr">
          <h1>Leitor de QR Code</h1>
          <aside>
    
          <div id="reader" style={{ width: "100%", height : '100%' }}></div>
          </aside>
          <div>
              <button onClick={startScanning}>Iniciar Leitura</button>
              <button id="stopRead" onClick={stopScanning}>Parar Leitura</button>
          </div>
    
          {qrCodeData && (
            <div id="result">
              <h2>Seja Bem vindo professor/a  {qrCodeData} </h2>
            </div>
          )}
        </div>
    </article>
  )

}