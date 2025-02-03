import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./index.css";

const QRCodeReader = () => {
  const [qrCodeData, setQrCodeData] = useState(null); // Dados do QR Code
  const [scanner, setScanner] = useState(null); // Armazena a instância do scanner
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

  return (
    <section>
      <div id="qr">
        <h1>Leitor de QR Code</h1>
        <aside>
          <div id="reader" style={{ width: "100%", height: "100%" }}></div>
        </aside>
        <div>
          <button onClick={startScanning}>Iniciar Leitura</button>
          <button id="stopRead" onClick={stopScanning}>
            Parar Leitura
          </button>
        </div>

        {qrCodeData && (
          <div id="result">
            <h2>
              Boa Tarde , Seja Bem Vindo Ao SmartPresence senhor/a {qrCodeData}{" "}
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default QRCodeReader;
