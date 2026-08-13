import React, { useState, useEffect, Suspense, type ReactNode } from 'react';
import darkTheme from './styles/dark';
import lightTheme from './styles/light';
import type { AppStyleSet } from './styles/types';

// Switch which visual theme is shown: 'dark' or 'light'
const ACTIVE_THEME: 'dark' | 'light' = 'dark';

const THEMES: Record<'dark' | 'light', AppStyleSet> = { dark: darkTheme, light: lightTheme };
const styles = THEMES[ACTIVE_THEME];

// Lazy loading all 5 Micro-Frontends
const MoodMeter = React.lazy(() => import('remoteMood/MoodMeter'));
const DayToday = React.lazy(() => import('remoteDayToday/DayToday'));
const TeamJoin = React.lazy(() => import('remoteTeam/TeamJoin'));
const Agenda = React.lazy(() => import('remoteAgenda/Agenda'));
const MiniGame = React.lazy(() => import('remoteGame1/Game'));

function Spinner() {
  return (
    <div className="leoday-spinner-wrap">
      <div className="leoday-spinner" />
    </div>
  );
}

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
        <Suspense fallback={<Spinner />}>
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .leoday-spinner-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .leoday-spinner {
          width: 32px;
          height: 32px;
          border: 4px solid rgba(34, 197, 94, 0.25);
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: leoday-spin 0.8s linear infinite;
        }

        @keyframes leoday-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <main className="leoday-grid">
        <section style={styles.card}><ErrorBoundary><Suspense fallback={<Spinner />}><MoodMeter /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><ErrorBoundary><Suspense fallback={<Spinner />}><DayToday /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><ErrorBoundary><Suspense fallback={<Spinner />}><Agenda /></Suspense></ErrorBoundary></section>
        <section style={styles.card}><ErrorBoundary><Suspense fallback={<Spinner />}><TeamJoin /></Suspense></ErrorBoundary></section>
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

export default App;
