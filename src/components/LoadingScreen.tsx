import { useState, useEffect, useRef, useCallback } from "react";

const bootLines = [
  "SYSTEM BOOT INITIATED",
  "Loading neural core…",
  "Calibrating HUD overlay…",
  "Connecting to secure grid…",
  "AI modules online…",
  "Voice interface active…",
  "JARVIS READY",
];

function playStartupSound(ctx: AudioContext) {
  const now = ctx.currentTime;

  // Low rumble sweep
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(40, now);
  osc1.frequency.exponentialRampToValueAtTime(120, now + 1.2);
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.08, now + 0.3);
  gain1.gain.linearRampToValueAtTime(0.03, now + 1.2);
  gain1.gain.linearRampToValueAtTime(0, now + 1.8);
  osc1.connect(gain1).connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 1.8);

  // Digital beep sequence
  const beepFreqs = [880, 1100, 1320, 880, 1760];
  beepFreqs.forEach((freq, i) => {
    const t = now + 0.4 + i * 0.18;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  });

  // Rising power-up tone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(200, now + 1.4);
  osc2.frequency.exponentialRampToValueAtTime(1400, now + 2.2);
  gain2.gain.setValueAtTime(0, now + 1.4);
  gain2.gain.linearRampToValueAtTime(0.1, now + 1.6);
  gain2.gain.linearRampToValueAtTime(0, now + 2.4);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now + 1.4);
  osc2.stop(now + 2.5);

  // Final confirmation chime
  const chime = ctx.createOscillator();
  const chimeG = ctx.createGain();
  chime.type = "sine";
  chime.frequency.value = 1046.5; // C6
  chimeG.gain.setValueAtTime(0, now + 2.3);
  chimeG.gain.linearRampToValueAtTime(0.15, now + 2.35);
  chimeG.gain.exponentialRampToValueAtTime(0.001, now + 3.0);
  chime.connect(chimeG).connect(ctx.destination);
  chime.start(now + 2.3);
  chime.stop(now + 3.1);
}

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ready" | "exit">("boot");
  const [arcAngle, setArcAngle] = useState(0);
  const soundPlayed = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startSound = useCallback(() => {
    if (soundPlayed.current) return;
    soundPlayed.current = true;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      playStartupSound(ctx);
    } catch {}
  }, []);

  // Trigger sound on first user interaction or auto-play
  useEffect(() => {
    // Try auto-play
    startSound();
    const handler = () => startSound();
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [startSound]);

  // Progress + boot lines
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 1;
      });
    }, 28);

    const lineInterval = setInterval(() => {
      setVisibleLines((l) => {
        if (l >= bootLines.length) {
          clearInterval(lineInterval);
          return l;
        }
        return l + 1;
      });
    }, 380);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
    };
  }, []);

  // Arc rotation
  useEffect(() => {
    let raf: number;
    const spin = () => {
      setArcAngle((a) => a + 2);
      raf = requestAnimationFrame(spin);
    };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phase transitions
  useEffect(() => {
    if (progress >= 100 && visibleLines >= bootLines.length) {
      setTimeout(() => setPhase("ready"), 300);
      setTimeout(() => setPhase("exit"), 1200);
      setTimeout(onComplete, 1700);
    }
  }, [progress, visibleLines, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0 scale-105" : "opacity-100"
      }`}
      style={{ transition: "opacity 0.5s, transform 0.5s" }}
    >
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 right-0 h-px bg-primary/20"
          style={{ animation: "scan-line 2s linear infinite" }}
        />
      </div>

      {/* HUD corners */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/25 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/25 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/25 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/25 rounded-br-lg" />

      {/* Central arc reactor */}
      <div className="relative w-40 h-40 mb-10">
        {/* Outer rotating ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="72" fill="none" stroke="hsl(185 100% 50% / 0.08)" strokeWidth="1" />
          <circle cx="80" cy="80" r="60" fill="none" stroke="hsl(185 100% 50% / 0.12)" strokeWidth="1" />
          {/* Rotating arc */}
          <circle
            cx="80" cy="80" r="72"
            fill="none"
            stroke="hsl(185 100% 50% / 0.6)"
            strokeWidth="2"
            strokeDasharray="80 372"
            strokeLinecap="round"
            style={{ transform: `rotate(${arcAngle}deg)`, transformOrigin: "center" }}
          />
          <circle
            cx="80" cy="80" r="60"
            fill="none"
            stroke="hsl(214 100% 50% / 0.4)"
            strokeWidth="2"
            strokeDasharray="50 327"
            strokeLinecap="round"
            style={{ transform: `rotate(${-arcAngle * 0.7}deg)`, transformOrigin: "center" }}
          />
          {/* Progress arc */}
          <circle
            cx="80" cy="80" r="66"
            fill="none"
            stroke="hsl(185 100% 50% / 0.5)"
            strokeWidth="3"
            strokeDasharray={`${(progress / 100) * 415} 415`}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dasharray 0.1s" }}
          />
        </svg>
        {/* Core glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, hsl(185 100% 50% / ${0.15 + progress * 0.004}), transparent 70%)`,
              boxShadow: `0 0 ${20 + progress * 0.4}px hsl(185 100% 50% / ${0.1 + progress * 0.003})`,
            }}
          >
            <div
              className="w-6 h-6 rounded-full bg-primary"
              style={{
                boxShadow: `0 0 20px hsl(185 100% 50% / 0.8), 0 0 40px hsl(185 100% 50% / 0.4)`,
                opacity: 0.3 + progress * 0.007,
              }}
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1
        className={`font-heading text-2xl sm:text-3xl tracking-[0.35em] mb-2 transition-all duration-700 ${
          phase === "ready" ? "text-primary glow-text scale-110" : "text-primary/60 glow-text-sm"
        }`}
      >
        J.A.R.V.I.S.
      </h1>
      <p className="font-heading text-xs tracking-[0.5em] text-muted-foreground mb-8">
        {phase === "ready" ? "SYSTEM ONLINE" : "INITIALIZING"}
      </p>

      {/* Boot log */}
      <div className="w-72 sm:w-80 mb-6 h-44 overflow-hidden">
        {bootLines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mb-1.5 animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                i === bootLines.length - 1 && visibleLines >= bootLines.length
                  ? "bg-green-400 shadow-[0_0_6px_hsl(142_70%_50%/0.6)]"
                  : "bg-primary/60"
              }`}
            />
            <span
              className={`font-mono text-[11px] tracking-wider ${
                i === bootLines.length - 1 && visibleLines >= bootLines.length
                  ? "text-green-400"
                  : "text-muted-foreground"
              }`}
            >
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-72 sm:w-80">
        <div className="w-full h-1 bg-muted/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, hsl(185 100% 50%), hsl(214 100% 50%))",
              boxShadow: "0 0 12px hsl(185 100% 50% / 0.5)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">BOOT SEQUENCE</span>
          <span className="font-heading text-xs text-primary">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
