import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = ({ onScan, onError }) => {
  const videoRef = useRef(null);
  const [qrScanner, setQrScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (videoRef.current && !qrScanner) {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          onScan(result.data);
          setIsScanning(false);
        },
        {
          onDecodeError: (error) => {
            // Ignore decode errors, they're normal
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      
      setQrScanner(scanner);
    }

    return () => {
      if (qrScanner) {
        qrScanner.destroy();
      }
    };
  }, [onScan, qrScanner]);

  const startScanning = async () => {
    try {
      await qrScanner.start();
      setIsScanning(true);
    } catch (error) {
      onError('Falha ao iniciar câmera: ' + error.message);
    }
  };

  const stopScanning = () => {
    qrScanner.stop();
    setIsScanning(false);
  };

  return (
    <div className="qr-scanner" role="region" aria-labelledby="qr-scanner-title">
      <h3 id="qr-scanner-title" className="sr-only">Scanner de QR Code</h3>
      <video 
        ref={videoRef} 
        className="qr-video"
        aria-label="Visualização da câmera para escaneamento de QR code"
        playsInline
        muted
      ></video>
      <div className="scanner-controls">
        {!isScanning ? (
          <button 
            onClick={startScanning} 
            className="scan-button"
            aria-describedby="scan-instructions"
          >
            Iniciar Escaneamento
          </button>
        ) : (
          <button 
            onClick={stopScanning} 
            className="scan-button stop"
            aria-describedby="stop-instructions"
          >
            Parar Escaneamento
          </button>
        )}
        <div id="scan-instructions" className="sr-only">
          Clique para ativar a câmera e escanear QR codes
        </div>
        <div id="stop-instructions" className="sr-only">
          Clique para parar o escaneamento e desativar a câmera
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
