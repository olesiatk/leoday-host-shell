import React, { useState, useEffect, Suspense, type CSSProperties, type ReactNode } from 'react';

// Lazy loading all 5 Micro-Frontends
const MoodMeter = React.lazy(() => import('remoteMood/MoodMeter'));
const DayToday = React.lazy(() => import('remoteDayToday/DayToday'));
const TeamJoin = React.lazy(() => import('remoteTeam/TeamJoin'));
const Agenda = React.lazy(() => import('remoteAgenda/Agenda'));
const MiniGame = React.lazy(() => import('remoteGame1/Game'));

function GameLauncher() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div style={styles.gameLauncher}>
        <button style={styles.startBtn} onClick={() => setStarted(true)}>▶ Start game</button>
      </div>
    );
  }

  return (
    <div>
      <button style={styles.stopBtn} onClick={() => setStarted(false)}>■ Stop game</button>
      <ErrorBoundary>
        <Suspense fallback="Loading...">
          <MiniGame />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return <div style={styles.fallback}>⚠️ Component Temporarily Unavailable</div>;
    }
    return this.props.children;
  }
}

interface MoodUpdatedDetail {
  message: string;
}

export function App() {
  const [userStatus, setUserStatus] = useState('Welcome to LEOday Dashboard!');

  useEffect(() => {
    const handleMoodUpdate = (e: Event) => {
      const { detail } = e as CustomEvent<MoodUpdatedDetail>;
      setUserStatus(`Current Vibe: ${detail.message}`);
    };
    window.addEventListener('leoday:mood-updated', handleMoodUpdate);
    return () => window.removeEventListener('leoday:mood-updated', handleMoodUpdate);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>LEOday Dashboard</h1>
        <p style={styles.status}>{userStatus}</p>
      </header>

      <style>{`
        .leoday-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
          gap: 20px;
        }
      `}</style>

      <main className="leoday-grid">
        <section style={styles.card}><ErrorBoundary><Suspense fallback="Loading..."><MoodMeter /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><ErrorBoundary><Suspense fallback="Loading..."><DayToday /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><ErrorBoundary><Suspense fallback="Loading..."><Agenda /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><ErrorBoundary><Suspense fallback="Loading..."><TeamJoin /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><GameLauncher /></section>
        <section style={styles.card}>
          <div style={styles.adBlock}>
            <p style={styles.adText}>
              Тут може бути вaшa{' '}
              <span style={styles.correctionWrap}>
                <span style={styles.strikeWord}>реклама</span>
                <span style={styles.correctionNote}>POC</span>
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: '#0d0f12', color: '#e6edf3', padding: '32px 40px', minHeight: '100%'},
  // container: { fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: 'white', color: 'black', padding: '40px'},
  header: { paddingBottom: '20px',},
  title: { color: '#57B12D', margin: 0, fontSize: '32px', fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase' },
  status: { color: '#8b949e', marginTop: '8px' },
  card: { background: '#161b22', borderRadius: '12px', padding: '20px', border: '1px solid #30363d' },
  // card: { background: 'bluegreen', borderRadius: '12px', padding: '20px', border: '1px solid #30363d' },
  adBlock: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px', textAlign: 'center' },
  adText: { margin: 0, marginTop: '18px', fontSize: '16px', color: '#e6edf3' },
  correctionWrap: { position: 'relative', display: 'inline-block' },
  strikeWord: { textDecoration: 'line-through', textDecorationColor: '#f85149', textDecorationThickness: '2px', color: '#8b949e' },
  correctionNote: {
    position: 'absolute',
    top: '-18px',
    left: '4px',
    fontSize: '14px',
    fontWeight: 700,
    color: '#f85149',
    fontFamily: "'Comic Sans MS', cursive",
    transform: 'rotate(-8deg)',
    whiteSpace: 'nowrap',
  },
  fallback: { padding: '15px', background: '#21262d', color: '#ffa657', borderRadius: '6px', textAlign: 'center' },
  gameLauncher: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80px' },
  startBtn: { background: '#57B12D', color: '#0d1117', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' },
  stopBtn: { background: '#21262d', color: '#f85149', border: '1px solid #f85149', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '12px', marginBottom: '10px' },
};

export default App;
