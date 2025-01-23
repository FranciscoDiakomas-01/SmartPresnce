import { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeReader = () => {
  const [isCameraActive, setIsCameraActive] = useState(false); // Controla se a câmera está ativa
  const [qrCodeData, setQrCodeData] = useState(null); // Dados do QR code lido

  // Função que é chamada quando um QR code é escaneado
  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data); // Armazena os dados do QR code
    }
  };

  // Função chamada em caso de erro de leitura
  const handleError = (err) => {
    console.error(err);
  };

  // Função para iniciar a leitura do QR code
  const startScanning = () => {
    setIsCameraActive(true); // Ativa a câmera
    setQrCodeData(null); // Reseta o dado do QR code lido
  };

  // Função para parar a leitura do QR code
  const stopScanning = () => {
    setIsCameraActive(false); // Desativa a câmera
    setQrCodeData(null); // Reseta o dado do QR code lido
  };

  return (
    <div>
      <h1>Leitor de QR Code</h1>

      {isCameraActive ? (
        <>
          {/* O componente de escaneamento da câmera */}
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <button onClick={stopScanning}>Cancelar</button>
        </>
      ) : (
        <>
          <button onClick={startScanning}>Start</button>
        </>
      )}

      {qrCodeData && (
        <div>
          <h2>Dados do QR Code:</h2>
          <p>{qrCodeData}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeReader;
