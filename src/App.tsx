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
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
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

export default App;
