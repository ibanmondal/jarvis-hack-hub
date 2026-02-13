import { useState, useEffect } from "react";
import GlowCard from "@/components/GlowCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, FileCheck, Clock, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("2026-03-15T09:00:00").getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = 65;

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-heading text-xs tracking-[0.4em] text-primary/60 mb-2 text-center">COMMAND CENTER</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12 glow-text">
            Team Dashboard
          </h1>
        </ScrollReveal>

        {/* Countdown */}
        <ScrollReveal>
          <div className="flex justify-center gap-4 sm:gap-6 mb-12">
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="glass rounded-lg px-4 sm:px-6 py-3 sm:py-4 animated-border glow-box min-w-[70px]">
                  <span className="font-heading text-2xl sm:text-4xl text-primary glow-text-sm">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="font-heading text-[10px] tracking-[0.2em] text-muted-foreground mt-2 block uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Info */}
          <ScrollReveal>
            <GlowCard hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-primary" size={20} />
                <h3 className="font-heading text-sm tracking-wider text-foreground">TEAM INFO</h3>
              </div>
              <div className="space-y-3 text-sm">
                <InfoRow label="Team Name" value="Neural Nexus" />
                <InfoRow label="Track" value="Artificial Intelligence" />
                <InfoRow label="Members" value="3 / 4" />
                <InfoRow label="Status" value="Active" highlight />
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* Submission Status */}
          <ScrollReveal>
            <GlowCard hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="text-primary" size={20} />
                <h3 className="font-heading text-sm tracking-wider text-foreground">SUBMISSION</h3>
              </div>
              <div className="space-y-3 text-sm">
                <InfoRow label="Project" value="AI Diagnostics" />
                <InfoRow label="Repository" value="Linked" highlight />
                <InfoRow label="Demo Video" value="Pending" />
                <InfoRow label="Presentation" value="Pending" />
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* Progress */}
          <ScrollReveal>
            <GlowCard hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-primary" size={20} />
                <h3 className="font-heading text-sm tracking-wider text-foreground">PROGRESS</h3>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(215 40% 15%)" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="hsl(185 100% 50%)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${progress * 2.64} ${264 - progress * 2.64}`}
                      style={{ filter: "drop-shadow(0 0 6px hsl(185 100% 50% / 0.5))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-2xl text-primary glow-text-sm">{progress}%</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>

          {/* Timer */}
          <ScrollReveal>
            <GlowCard hover={false}>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-primary" size={20} />
                <h3 className="font-heading text-sm tracking-wider text-foreground">TIME REMAINING</h3>
              </div>
              <div className="text-center py-6">
                <p className="font-heading text-4xl text-primary glow-text-sm tracking-widest">
                  {String(countdown.hours).padStart(2, "0")}:
                  {String(countdown.mins).padStart(2, "0")}:
                  {String(countdown.secs).padStart(2, "0")}
                </p>
                <p className="text-muted-foreground text-xs mt-3 tracking-wider">UNTIL HACKATHON BEGINS</p>
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className="text-muted-foreground">{label}</span>
    <span className={highlight ? "text-primary font-heading text-xs tracking-wider" : "text-foreground"}>
      {value}
    </span>
  </div>
);

export default Dashboard;
