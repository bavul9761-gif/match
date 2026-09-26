import { useCallback, useEffect, useRef, useState } from 'react';
import { BET_OPTIONS, createGrid, createSpinPlan, type Grid } from './engine';
import { playSound } from './audio';

const START_CREDITS = 5000;
const STORAGE_KEY = 'astral-falls-demo-credits';

function initialCredits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return START_CREDITS;
    const stored = Number(raw);
    return Number.isFinite(stored) && stored >= 0 ? stored : START_CREDITS;
  } catch {
    return START_CREDITS;
  }
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export function useSlotGame() {
  const [board, setBoard] = useState<Grid>(() => createGrid());
  const [phase, setPhase] = useState<'idle' | 'fall' | 'win'>('idle');
  const [highlightIds, setHighlightIds] = useState<number[]>([]);
  const [credits, setCredits] = useState(initialCredits);
  const [bet, setBetValue] = useState<number>(BET_OPTIONS[0]);
  const [freeSpins, setFreeSpins] = useState(0);
  const [freeBet, setFreeBet] = useState<number>(BET_OPTIONS[0]);
  const [lastWin, setLastWin] = useState(0);
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  const [cascades, setCascades] = useState(0);
  const [statusText, setStatusText] = useState('Bir bahis seç ve dönüşü başlat');
  const [history, setHistory] = useState<number[]>([]);
  const [muted, setMuted] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(credits));
    } catch {
      // Demo remains playable if browser storage is unavailable.
    }
  }, [credits]);

  const setBet = useCallback((value: number) => {
    if (!busy.current && freeSpins === 0 && Number.isFinite(value) && value >= 0.2 && value <= 100) {
      setBetValue(Math.round(value * 100) / 100);
    }
  }, [freeSpins]);

  const resetDemo = useCallback(() => {
    if (busy.current) return;
    setCredits(START_CREDITS);
    setFreeSpins(0);
    setFreeBet(BET_OPTIONS[0]);
    setHistory([]);
    setLastWin(0);
    setTotalMultiplier(0);
    setCascades(0);
    setStatusText('Demo bakiyesi yenilendi');
  }, []);

  const spin = useCallback(async () => {
    if (busy.current) return;
    const isFree = freeSpins > 0;
    const stake = isFree ? freeBet : bet;
    if (!isFree && credits < stake) {
      setStatusText('Demo bakiyesi yetersiz — bakiyeyi yenile');
      return;
    }
    busy.current = true;
    const speed = turbo ? 0.52 : 1;
    if (isFree) setFreeSpins((remaining) => remaining - 1);
    else setCredits((current) => current - stake);
    setLastWin(0);
    setTotalMultiplier(0);
    setCascades(0);
    setHighlightIds([]);
    setStatusText(isFree ? 'Ücretsiz dönüş oynanıyor' : 'Semboller düşüyor');
    // This entire plan is for local visual demonstration only. A production
    // adapter must replace it with an authoritative server-produced outcome.
    const plan = createSpinPlan(stake, isFree);
    setBoard(plan.initialGrid);
    setPhase('fall');
    playSound('drop', muted);
    await delay(490 * speed);
    if (!mounted.current) return;

    for (let i = 0; i < plan.cascades.length; i++) {
      const step = plan.cascades[i];
      setPhase('win');
      setHighlightIds(step.removedIds);
      setTotalMultiplier(step.multiplier);
      setCascades(i + 1);
      setStatusText(`${i + 1}. zincir • ${step.multiplier}× çarpan`);
      playSound('match', muted);
      await delay(530 * speed);
      if (!mounted.current) return;
      setHighlightIds([]);
      setBoard(step.nextGrid);
      setPhase('fall');
      playSound('drop', muted);
      await delay(430 * speed);
      if (!mounted.current) return;
    }

    setPhase('idle');
    setCredits((current) => current + plan.payout);
    setLastWin(plan.payout);
    setHistory((current) => [plan.payout, ...current].slice(0, 8));
    if (plan.freeSpinsAwarded) {
      setFreeBet(stake);
      setFreeSpins((remaining) => remaining + plan.freeSpinsAwarded);
      setStatusText(`Bonus açıldı • ${plan.freeSpinsAwarded} ücretsiz dönüş`);
      playSound('bonus', muted);
    } else if (plan.payout > 0) {
      setStatusText(`${plan.payout.toLocaleString('tr-TR')} demo kredi kazandın`);
      playSound('win', muted);
    } else {
      setStatusText('Bu tur kazanç yok • yeniden dene');
    }
    busy.current = false;
  }, [bet, credits, freeBet, freeSpins, muted, turbo]);

  return {
    board, phase, highlightIds, credits, bet, setBet, spin, resetDemo,
    muted, toggleMute: () => setMuted((value) => !value),
    turbo, toggleTurbo: () => setTurbo((value) => !value),
    freeSpins, lastWin, totalMultiplier, cascades, statusText, history,
  };
}