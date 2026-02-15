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

  // === HEAVY MECHANICAL POWER-ON RUMBLE ===
  const rumble = ctx.createOscillator();
  const rumbleGain = ctx.createGain();
  const rumbleFilter = ctx.createBiquadFilter();
  rumble.type = "sawtooth";
  rumble.frequency.setValueAtTime(25, now);
  rumble.frequency.exponentialRampToValueAtTime(80, now + 1.5);
  rumble.frequency.exponentialRampToValueAtTime(45, now + 2.5);
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.value = 200;
  rumbleFilter.Q.value = 8;
  rumbleGain.gain.setValueAtTime(0, now);
  rumbleGain.gain.linearRampToValueAtTime(0.18, now + 0.15);
  rumbleGain.gain.setValueAtTime(0.18, now + 1.0);
  rumbleGain.gain.linearRampToValueAtTime(0.06, now + 2.5);
  rumbleGain.gain.linearRampToValueAtTime(0, now + 3.2);
  rumble.connect(rumbleFilter).connect(rumbleGain).connect(ctx.destination);
  rumble.start(now);
  rumble.stop(now + 3.3);

  // === HYDRAULIC HISS (noise burst) ===
  const noiseLen = ctx.sampleRate * 1.5;
  const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const noiseData = noiseBuf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) noiseData[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 3000;
  noiseFilter.Q.value = 2;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now + 0.1);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(now + 0.1);
  noise.stop(now + 1.0);

  // === MECHANICAL SERVO CLICKS ===
  const clickTimes = [0.3, 0.55, 0.75, 1.1, 1.4, 1.65, 1.95];
  clickTimes.forEach((t) => {
    const clickBuf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
    const clickData = clickBuf.getChannelData(0);
    for (let i = 0; i < clickData.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.004));
    }
    const click = ctx.createBufferSource();
    click.buffer = clickBuf;
    const clickGain = ctx.createGain();
    clickGain.gain.value = 0.15 + Math.random() * 0.1;
    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = "highpass";
    clickFilter.frequency.value = 1500 + Math.random() * 2000;
    click.connect(clickFilter).connect(clickGain).connect(ctx.destination);
    click.start(now + t);
  });

  // === TURBINE SPIN-UP ===
  const turbine = ctx.createOscillator();
  const turbineGain = ctx.createGain();
  const turbineFilter = ctx.createBiquadFilter();
  turbine.type = "square";
  turbine.frequency.setValueAtTime(60, now + 1.0);
  turbine.frequency.exponentialRampToValueAtTime(600, now + 2.4);
  turbine.frequency.exponentialRampToValueAtTime(400, now + 3.0);
  turbineFilter.type = "bandpass";
  turbineFilter.frequency.setValueAtTime(200, now + 1.0);
  turbineFilter.frequency.exponentialRampToValueAtTime(1200, now + 2.4);
  turbineFilter.Q.value = 3;
  turbineGain.gain.setValueAtTime(0, now + 1.0);
  turbineGain.gain.linearRampToValueAtTime(0.07, now + 1.4);
  turbineGain.gain.setValueAtTime(0.07, now + 2.4);
  turbineGain.gain.linearRampToValueAtTime(0.02, now + 3.0);
  turbineGain.gain.linearRampToValueAtTime(0, now + 3.5);
  turbine.connect(turbineFilter).connect(turbineGain).connect(ctx.destination);
  turbine.start(now + 1.0);
  turbine.stop(now + 3.5);

  // === POWER SURGE HUM ===
  const hum = ctx.createOscillator();
  const humGain = ctx.createGain();
  hum.type = "sawtooth";
  hum.frequency.value = 120;
  humGain.gain.setValueAtTime(0, now + 2.0);
  humGain.gain.linearRampToValueAtTime(0.12, now + 2.3);
  humGain.gain.linearRampToValueAtTime(0.04, now + 2.8);
  humGain.gain.linearRampToValueAtTime(0, now + 3.5);
  hum.connect(humGain).connect(ctx.destination);
  hum.start(now + 2.0);
  hum.stop(now + 3.6);

  // === FINAL LOCK-IN IMPACT ===
  const impact = ctx.createOscillator();
  const impactGain = ctx.createGain();
  impact.type = "sine";
  impact.frequency.setValueAtTime(80, now + 2.6);
  impact.frequency.exponentialRampToValueAtTime(30, now + 3.2);
  impactGain.gain.setValueAtTime(0, now + 2.6);
  impactGain.gain.linearRampToValueAtTime(0.2, now + 2.62);
  impactGain.gain.exponentialRampToValueAtTime(0.001, now + 3.3);
  impact.connect(impactGain).connect(ctx.destination);
  impact.start(now + 2.6);
  impact.stop(now + 3.4);

  // === CONFIRMATION PING ===
  const ping = ctx.createOscillator();
  const pingGain = ctx.createGain();
  ping.type = "sine";
  ping.frequency.value = 1046.5;
  pingGain.gain.setValueAtTime(0, now + 2.9);
  pingGain.gain.linearRampToValueAtTime(0.13, now + 2.93);
  pingGain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);
  ping.connect(pingGain).connect(ctx.destination);
  ping.start(now + 2.9);
  ping.stop(now + 3.7);
}

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ready" | "exit">("boot");
  const [arcAngle, setArcAngle] = useState(0);
  const soundPlayed = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isStarted, setIsStarted] = useState(false);

  const startSound = useCallback(() => {
    if (soundPlayed.current) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      soundPlayed.current = true;
      setIsStarted(true); // Force re-render to start animations
      playStartupSound(ctx);
    } catch (e) {
      console.error("Audio context error:", e);
      // Fallback if audio fails
      soundPlayed.current = true;
      setIsStarted(true);
    }
  }, []);

  // Trigger sound only on manual start
  useEffect(() => {
    return () => {
      // Clean up audio context on unmount
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  // Progress + boot lines
  useEffect(() => {
    if (!soundPlayed.current) return;

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
  }, [soundPlayed.current]); // React to startSound triggering

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${phase === "exit" ? "opacity-0 scale-105" : "opacity-100"
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

      {phase === "boot" && progress === 0 && !soundPlayed.current ? (
        <div className="z-50 text-center animate-fade-in">
          <button
            onClick={startSound}
            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-md transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-primary/10 border border-primary/50 group-hover:bg-primary/20 transition-all" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/5 blur-xl transition-all" />
            <span className="relative font-heading text-lg tracking-[0.2em] text-primary group-hover:text-white transition-colors">
              INITIALIZE PROTOCOL
            </span>
          </button>
          <p className="mt-4 font-mono text-[10px] text-primary/40 tracking-widest uppercase">
            System awaiting manual override
          </p>
        </div>
      ) : (
        <>
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
            className={`font-heading text-2xl sm:text-3xl tracking-[0.35em] mb-2 transition-all duration-700 ${phase === "ready" ? "text-primary glow-text scale-110" : "text-primary/60 glow-text-sm"
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
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === bootLines.length - 1 && visibleLines >= bootLines.length
                    ? "bg-green-400 shadow-[0_0_6px_hsl(142_70%_50%/0.6)]"
                    : "bg-primary/60"
                    }`}
                />
                <span
                  className={`font-mono text-[11px] tracking-wider ${i === bootLines.length - 1 && visibleLines >= bootLines.length
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
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
