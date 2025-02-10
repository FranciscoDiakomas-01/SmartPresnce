
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import createPresence, { updatePresence } from "../../services/scanner";
import "./index.css";
const QRCodeReader = () => {
  const [scanner, setScanner] = useState<null | Html5QrcodeScanner>(null);
  const [msg, setMsg] = useState("");
  const startScanning = (type: number) => {
    const newScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 450, rememberLastUsedCamera: true },
      false
    );
    newScanner.render(
      async (decodedText) => {
        setMsg("Token óbtido , por favor aguarde");
        document.getElementById("stopRead")?.click();
        await presence(type, decodedText);
        return;
      },
      (error) => {
        setMsg(error);
      }
    );
    setScanner(newScanner);
  };
  async function presence(type: number, token: string) {
    if (token.length == 0) {
      setMsg("Erro na leitura");
      token = "";
      setTimeout(() => {
        setMsg("");
      }, 4000);
      return;
    }
    if (type == 1) {
      const response = await createPresence(token);
      setTimeout(() => {
        if (response?.error) {
          setMsg(response.error);
          setTimeout(() => {
            setMsg("");
          }, 4000);
          return;
        } else if (response?.msg) {
          setMsg(response.msg);
          setTimeout(() => {
            setMsg("");
          }, 4000);
          return;
        } else {
          setMsg("Token inválido");
        }
      }, 2500);
    } else {
      const response = await updatePresence(token);
      setTimeout(() => {
        if (response?.error) {
          setMsg(response.error);
          setTimeout(() => {
            setMsg("");
          }, 4000);
          return;
        } else if (response?.msg) {
          setMsg(response.msg);
          setTimeout(() => {
            setMsg("");
          }, 4000);
          return;
        } else {
          setMsg("Token inválido");
        }
      }, 2500);
      return;
    }
  }
  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
    }
  };

  return (
    <section id="qrcodePro">
      <div id="qr">
        <h1>Leitor de QR Code</h1>
        <aside>
          <div id="reader" style={{ width: "100%", height: "100%" }}></div>
        </aside>
        <div>
          <button
            onClick={() => {
              startScanning(1);
            }}
          >
            Entrada
          </button>
          <button
            onClick={() => {
              startScanning(2);
            }}
          >
            Saída
          </button>
          <button
            id="stopRead"
            onClick={() => {
              stopScanning();
            }}
          >
            Parar Leitura
          </button>
        </div>
        <p
          style={{
            color: msg?.includes("Bem") ? "var(--blue2)" : "red",
          }}
        >
          {msg}
        </p>
      </div>
    </section>
  );
};

export default QRCodeReader;
