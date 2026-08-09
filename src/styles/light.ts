import type { AppStyleSet } from './types';

// Page chrome goes light, but cards stay on a dark background — the remote
// widgets rendered inside them (MoodMeter, DayToday, etc.) hardcode white/light
// text, so a light card would make that text unreadable.
const lightTheme: AppStyleSet = {
  container: { fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: '#f6f8fa', color: '#1c2128', padding: '32px 40px', minHeight: '100%' },
  header: { paddingBottom: '20px' },
  title: { color: '#57B12D', margin: 0, fontSize: '32px', fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase' },
  status: { color: '#57606a', marginTop: '8px' },
  card: { background: '#161b22', borderRadius: '12px', padding: '20px', border: '1px solid #30363d', boxShadow: '0 1px 4px rgba(27, 31, 36, 0.12)' },
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

export default lightTheme;
