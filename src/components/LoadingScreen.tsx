import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const fullText = "Initializing JARVIS Interface…";

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center animate-glow-pulse">
          <div className="w-12 h-12 rounded-full border border-primary/60 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse-glow" />
          </div>
        </div>
      </div>

      <p className="font-heading text-primary text-lg tracking-[0.3em] mb-6 glow-text-sm min-h-[1.75rem]">
        {text}
        <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
      </p>

      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-75"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px hsl(185 100% 50% / 0.5)" }}
        />
      </div>
      <p className="font-heading text-muted-foreground text-xs mt-3 tracking-widest">
        {progress}%
      </p>
    </div>
  );
};

export default LoadingScreen;
