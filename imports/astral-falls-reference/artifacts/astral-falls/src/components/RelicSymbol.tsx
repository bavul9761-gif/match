import type { SymbolId } from '../game/engine';

const colors: Record<SymbolId, [string, string, string]> = {
  sun: ['#fff0b7', '#dba75d', '#8e563f'],
  moon: ['#e6f8e9', '#92c4c0', '#46808a'],
  star: ['#fff4d9', '#d2a7ce', '#796eab'],
  comet: ['#ffe6b9', '#e99477', '#aa697b'],
  prism: ['#e1fff0', '#91d6bd', '#537b93'],
  crown: ['#ffecc3', '#dbab67', '#a87263'],
  scatter: ['#ffddce', '#e58f9d', '#906eab'],
  multiplier: ['#fff0c0', '#e6ba6c', '#a86d50'],
};

export const symbolNames: Record<SymbolId, string> = {
  sun: 'Güneş mührü',
  moon: 'Ay mührü',
  star: 'Yıldız mührü',
  comet: 'Kuyruklu yıldız',
  prism: 'Kristal prizma',
  crown: 'Taç',
  scatter: 'Geçit',
  multiplier: 'Çarpan',
};

export function RelicSymbol({ symbol }: { symbol: SymbolId }) {
  const [light, mid, deep] = colors[symbol];
  const gradient = `relic-${symbol}`;
  return (
    <svg className="symbol-art" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="22" y1="12" x2="82" y2="94" gradientUnits="userSpaceOnUse">
          <stop stopColor={light} />
          <stop offset=".48" stopColor={mid} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
      </defs>
      {symbol === 'sun' && <>
        <circle cx="50" cy="50" r="35" stroke={mid} strokeWidth="1.5" opacity=".55" />
        <path d="M50 4 55 20 50 25 45 20 50 4ZM50 96 55 80 50 75 45 80 50 96ZM4 50 20 45 25 50 20 55 4 50ZM96 50 80 45 75 50 80 55 96 50ZM17 17 29 25 28 31 22 29 17 17ZM83 83 71 75 72 69 78 71 83 83ZM83 17 75 29 69 28 71 22 83 17ZM17 83 25 71 31 72 29 78 17 83Z" fill={`url(#${gradient})`} stroke={light} strokeWidth=".7" />
        <circle cx="50" cy="50" r="23" fill={`url(#${gradient})`} stroke={light} strokeWidth="2" />
        <circle cx="50" cy="50" r="16" stroke="#fff2ca" strokeWidth=".9" opacity=".8" />
        <path d="M50 35 54 46 65 50 54 54 50 65 46 54 35 50 46 46 50 35Z" fill={light} />
      </>}
      {symbol === 'moon' && <>
        <circle cx="49" cy="50" r="36" stroke={mid} strokeWidth="1.2" opacity=".6" />
        <path d="M65 18C49 20 37 32 37 49c0 17 12 29 28 31-7 5-15 7-24 5C22 81 13 65 17 47c4-19 23-32 42-30l6 1Z" fill={`url(#${gradient})`} stroke={light} strokeWidth="1.6" />
        <path d="M67 32 69 39 76 41 69 43 67 50 65 43 58 41 65 39 67 32ZM75 55l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill={light} />
        <path d="M30 78c12 9 30 9 42-2" stroke={mid} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
      </>}
      {symbol === 'star' && <>
        <circle cx="50" cy="50" r="38" stroke={mid} strokeWidth="1.2" opacity=".52" />
        <path d="m50 9 8 25 23-15-15 23 25 8-25 8 15 23-23-15-8 25-8-25-23 15 15-23-25-8 25-8-15-23 23 15 8-25Z" fill={`url(#${gradient})`} stroke={light} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m50 25 7 18 18 7-18 7-7 18-7-18-18-7 18-7 7-18Z" fill="#263951" stroke={light} strokeWidth="1.3" />
        <circle cx="50" cy="50" r="5" fill={light} />
      </>}
      {symbol === 'comet' && <>
        <path d="M12 77c15-1 23-5 31-13M9 87c22-1 37-11 44-19M20 58c12 2 20 2 29-4" stroke={mid} strokeWidth="2" strokeLinecap="round" opacity=".7" />
        <path d="M16 72c14-3 24-7 32-18 6-9 11-21 25-25-3 9-2 16-8 26-10 15-26 22-49 17Z" fill={`url(#${gradient})`} opacity=".65" />
        <path d="M68 15 77 28 92 33 80 44 78 60 63 52 48 55 52 39 45 25 61 25 68 15Z" fill={`url(#${gradient})`} stroke={light} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m69 27 5 11 11 2-9 7-3 10-9-7-11 1 5-10-4-10 11 1 4-5Z" fill={light} opacity=".6" />
      </>}
      {symbol === 'prism' && <>
        <path d="M50 7 79 27 85 65 50 93 15 65 21 27 50 7Z" fill={`url(#${gradient})`} stroke={light} strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 7v86M21 27h58M15 65l35-38 35 38M15 65l35 28 35-28M50 27 21 27l-6 38M50 27l29 0 6 38" stroke={light} strokeWidth="1.4" opacity=".85" />
        <path d="M50 27 70 48 50 80 30 48 50 27Z" fill="#d3f8db" fillOpacity=".32" stroke="#e3ffeb" strokeWidth="1" />
        <path d="M50 31v45M33 48h34" stroke="#fff9df" strokeWidth="1" opacity=".7" />
      </>}
      {symbol === 'crown' && <>
        <circle cx="50" cy="48" r="40" stroke={mid} strokeWidth="1.1" opacity=".45" />
        <path d="m13 35 20 14 17-29 17 29 20-14-7 41H20l-7-41Z" fill={`url(#${gradient})`} stroke={light} strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 62h56M20 76h60M33 49l-5 12M67 49l5 12M50 20v41" stroke={light} strokeWidth="1.2" opacity=".75" />
        <path d="m50 43 7 8-7 8-7-8 7-8Z" fill="#b5e1d0" stroke="#eeffde" strokeWidth="1" />
        <circle cx="13" cy="35" r="3" fill={light} /><circle cx="50" cy="20" r="3" fill={light} /><circle cx="87" cy="35" r="3" fill={light} />
      </>}
      {symbol === 'scatter' && <>
        <path d="M50 6c23 0 42 19 42 42S73 90 50 90 8 71 8 48 27 6 50 6Z" stroke={mid} strokeWidth="1.3" strokeDasharray="3 5" />
        <path d="M50 12 79 29v37L50 84 21 66V29L50 12Z" fill={`url(#${gradient})`} stroke={light} strokeWidth="1.8" />
        <path d="M50 23c-15 0-23 13-23 27 0 15 9 25 23 30 14-5 23-15 23-30 0-14-8-27-23-27Z" fill="#402f4a" stroke={light} strokeWidth="1.6" />
        <path d="M50 30c-9 8-14 14-14 23s6 16 14 20c8-4 14-11 14-20s-5-15-14-23Z" fill={`url(#${gradient})`} />
        <path d="m50 36 5 14-5 17-5-17 5-14Z" fill="#fff0d2" />
      </>}
      {symbol === 'multiplier' && <>
        <circle cx="50" cy="50" r="39" stroke={mid} strokeWidth="2" />
        <circle cx="50" cy="50" r="31" fill={`url(#${gradient})`} stroke={light} strokeWidth="2" />
        <circle cx="50" cy="50" r="23" fill="#35434b" stroke="#ffe0a5" strokeWidth="1.2" />
        <path d="M50 12v14M50 74v14M12 50h14M74 50h14M23 23l10 10M67 67l10 10M77 23 67 33M33 67 23 77" stroke={light} strokeWidth="2" strokeLinecap="round" />
        <path d="M37 39 63 65M63 39 37 65" stroke={light} strokeWidth="7" strokeLinecap="round" />
        <path d="M37 39 63 65M63 39 37 65" stroke={deep} strokeWidth="2" strokeLinecap="round" />
      </>}
    </svg>
  );
}