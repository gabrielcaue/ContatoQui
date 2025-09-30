import { useState } from 'react';
import QRScanner from './components/QRScanner';
import ParticipantProfile from './components/ParticipantProfile';
import { getParticipantByLinkedIn } from './services/api';
import './styles/App.css';

function App() {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(true);

  const handleQRScan = async (qrData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Assume QR code contains LinkedIn URL
      const participantData = await getParticipantByLinkedIn(qrData);
      setParticipant(participantData);
      setShowScanner(false);
    } catch (err) {
      setError('Participante não encontrado ou QR code inválido');
    } finally {
      setLoading(false);
    }
  };

  const handleScanError = (errorMessage) => {
    setError(errorMessage);
  };

  const resetApp = () => {
    setParticipant(null);
    setError(null);
    setShowScanner(true);
  };

  return (
    <div className="app">
      <header className="app-header" role="banner">
        <h1>SBGAMES 2025</h1>
        <p>Hub de Networking</p>
      </header>

      <main className="app-main" role="main">
        {showScanner && (
          <section className="scanner-section" aria-labelledby="scanner-title">
            <h2 id="scanner-title">Escanear QR Code</h2>
            <QRScanner onScan={handleQRScan} onError={handleScanError} />
          </section>
        )}

        {loading && (
          <div className="loading" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p>Carregando participante...</p>
            <span className="sr-only">Carregando informações do participante</span>
          </div>
        )}

        {error && (
          <div className="error" role="alert" aria-live="assertive">
            <p>{error}</p>
            <button 
              onClick={resetApp} 
              className="retry-button"
              aria-label="Tentar escanear novamente"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {participant && (
          <section className="profile-section" aria-labelledby="profile-title">
            <h2 id="profile-title" className="sr-only">Perfil do Participante</h2>
            <ParticipantProfile participant={participant} />
            <button 
              onClick={resetApp} 
              className="scan-another"
              aria-label="Escanear outro participante"
            >
              Escanear Outro
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
