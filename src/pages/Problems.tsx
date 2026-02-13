import GlowCard from "@/components/GlowCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Brain, Globe, ShieldCheck, Lightbulb } from "lucide-react";

const tracks = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description: "Build intelligent systems — from NLP to computer vision. Push the boundaries of machine learning and deep learning.",
    tags: ["ML", "NLP", "Computer Vision"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Craft next-gen web experiences using modern frameworks, APIs, and real-time technologies.",
    tags: ["React", "APIs", "Real-time"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Defend digital infrastructure. Build tools for threat detection, encryption, and secure authentication.",
    tags: ["Security", "Encryption", "Auth"],
  },
  {
    icon: Lightbulb,
    title: "Open Innovation",
    description: "No limits. Bring your wildest idea to life — solve any problem that matters to you with any technology.",
    tags: ["IoT", "Blockchain", "AR/VR"],
  },
];

const Problems = () => {
  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-heading text-xs tracking-[0.4em] text-primary/60 mb-2 text-center">SELECT MISSION</p>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-center mb-4 glow-text">
            Problem Tracks
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 text-lg">
            Choose your domain. Each track presents unique challenges designed to push your limits.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, i) => (
            <ScrollReveal key={track.title}>
              <GlowCard className="h-full group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <track.icon className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg text-foreground mb-2 tracking-wider">{track.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{track.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-heading tracking-wider px-2.5 py-1 rounded-full bg-primary/5 text-primary/70 border border-primary/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problems;
