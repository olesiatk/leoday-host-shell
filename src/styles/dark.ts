import type { AppStyleSet } from './types';

const darkTheme: AppStyleSet = {
  container: { fontFamily: "'Source Sans Pro', sans-serif", backgroundColor: '#0d0f12', color: '#e6edf3', padding: '32px', minHeight: '100%' },
  header: { paddingBottom: '20px' },
  title: { color: '#57B12D', margin: 0, fontSize: '32px', fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase' },
  status: { color: '#8b949e', marginTop: '8px' },
  card: { background: '#161b22', borderRadius: '12px', padding: '20px', border: '1px solid #30363d' },
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

export default darkTheme;
